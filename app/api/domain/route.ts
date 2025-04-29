import { NextResponse } from 'next/server';
import { SAUDI_TLDS } from '@/lib/utils/domain-utils';

async function checkDomainWithNicSa(domain: string) {
  try {
    // تنظيف النطاق
    domain = domain.toLowerCase().trim();

    // التحقق من صحة النطاق
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

    // التعامل مع مختلف حالات الاستجابة
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
    // إرجاع حالة خطأ بدلاً من رمي الخطأ
    return 'error';
  }
}

export async function POST(req: Request) {
  try {
    const { domainName } = await req.json();
    console.log('\n=== Checking Domain ===');
    console.log('Domain name:', domainName);

    // التحقق من صحة النطاق
    if (!SAUDI_TLDS.some(tld => domainName.endsWith(tld))) {
      return NextResponse.json({
        status: 'error',
        message: 'يجب أن ينتهي النطاق بأحد الامتدادات السعودية'
      }, { status: 400 });
    }

    const status = await checkDomainWithNicSa(domainName);
    
    let message = '';
    // Return only the status, let the frontend handle the message based on locale
    if (status === 'available' || status === 'in_use' || status === 'reserved_zone' || status === 'error') {
      message = status;
    }
    
    const response = { status, message };

    console.log('API Response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'حدث خطأ أثناء فحص النطاق'
      },
      { status: 500 }
    );
  }
}
