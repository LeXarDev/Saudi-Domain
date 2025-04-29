const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static('dist'));

// API route for domain checking
app.post('/api/domain', async (req, res) => {
  try {
    const { domainName } = req.body;
    console.log('\n=== Checking Domain ===');
    console.log('Domain name:', domainName);

    // التحقق من صحة النطاق
    const SAUDI_TLDS = ['.sa', '.com.sa', '.net.sa', '.org.sa', '.edu.sa', '.med.sa', '.pub.sa', '.sch.sa', '.gov.sa'];
    if (!SAUDI_TLDS.some(tld => domainName.endsWith(tld))) {
      return res.status(400).json({
        status: 'error',
        message: 'يجب أن ينتهي النطاق بأحد الامتدادات السعودية'
      });
    }

    const status = await checkDomainWithNicSa(domainName);
    
    let message = '';
    if (status === 'available' || status === 'in_use' || status === 'reserved_zone' || status === 'error') {
      message = status;
    }
    
    const response = { status, message };
    console.log('API Response:', response);
    return res.json(response);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'حدث خطأ أثناء فحص النطاق'
    });
  }
});

async function checkDomainWithNicSa(domain) {
  try {
    domain = domain.toLowerCase().trim();

    if (!domain) {
      throw new Error('Domain name is required');
    }

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
      console.warn(`Domain check returned status: ${response.status}`);
      return 'error';
    }

    const data = await response.json();
    return data.status || 'error';
  } catch (error) {
    console.error('Error checking domain with nic.sa:', error);
    return 'error';
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
