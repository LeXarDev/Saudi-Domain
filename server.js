const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('dist'));

// Serve index.html for all routes except /api
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile('dist/index.html', { root: __dirname });
});

// API route for domain checking
app.post('/api/domain', async (req, res) => {
  try {
    const { domainName } = req.body;
    
    // التحقق مما إذا كان domainName مصفوفة أم نص
    const domains = Array.isArray(domainName) ? domainName : [domainName];
    console.log('\n=== Checking Domains ===');
    console.log('Domain names:', domains);

    // التحقق من صحة النطاقات
    const SAUDI_TLDS = ['.sa', '.com.sa', '.net.sa', '.org.sa', '.edu.sa', '.med.sa', '.pub.sa', '.sch.sa', '.gov.sa'];
    for (const domain of domains) {
      if (!SAUDI_TLDS.some(tld => domain.endsWith(tld))) {
        return res.status(400).json({
          status: 'error',
          message: `النطاق ${domain} يجب أن ينتهي بأحد الامتدادات السعودية`
        });
      }
    }

    console.log('Processing domains:', domains);

    // فحص جميع النطاقات بالتوازي
    const results = [];
    for (const domain of domains) {
      try {
        console.log('Checking domain:', domain);
        const status = await checkDomainWithNicSa(domain);
        console.log('Domain status:', domain, status);
        results.push({
          domain,
          status,
          message: status
        });
      } catch (error) {
        console.error('Error checking domain:', domain, error);
        results.push({
          domain,
          status: 'error',
          message: 'Error checking domain'
        });
      }
    }

    console.log('All results:', results);

    // نرجع النتائج دائماً بنفس التنسيق
    return res.json(results);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'حدث خطأ أثناء فحص النطاق'
    });
  }
});

async function checkDomainWithNicSa(domain) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      domain = domain.toLowerCase().trim();

      if (!domain) {
        throw new Error('Domain name is required');
      }

      console.log(`Checking domain ${domain} (attempt ${attempt + 1}/${maxRetries})`);

      const response = await fetch('https://nic.sa/check/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          domainName: domain,
          checkType: 'availability'
        })
      });

      if (response.status === 422) {
        return 'reserved_zone';
      }
      
      if (!response.ok) {
        console.warn(`Domain check returned status: ${response.status} for ${domain}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Domain ${domain} check result:`, data);
      return data.status || 'error';
    } catch (error) {
      console.error(`Error checking domain ${domain} (attempt ${attempt + 1}/${maxRetries}):`, error);
      attempt++;
      
      if (attempt === maxRetries) {
        console.error(`All attempts failed for domain ${domain}`);
        return 'error';
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return 'error';
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
