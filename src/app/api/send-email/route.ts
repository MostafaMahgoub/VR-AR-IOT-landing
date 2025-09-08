import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const result = await resend.emails.send({
      from: "GasTech <onboarding@resend.dev>",
      to: ["support@gastech.com.sa"],
      subject: `New Consultation Request - ${data.name}`,
      html: generateEmailTemplate(data),
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

interface ConsultationRequestData {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  companyName?: string;
  stationsCount?: string | number;
  pumpsPerStation?: string | number;
  nozzlesPerPump?: string | number;
  tanksCount?: string | number;
  serviceProvided?: string;
  message?: string;
}

function getServiceLabel(
  serviceValue: string | undefined,
  language: "en" | "ar"
): string {
  if (!serviceValue) return language === "en" ? "Not specified" : "غير محدد";

  const serviceLabels = {
    "vr-ar": {
      en: "Virtual Reality & Augmented Reality (VR & AR)",
      ar: "الواقع الافتراضي والمعزز (VR & AR)",
    },
    "ai-iot": {
      en: "Artificial Intelligence & Internet of Things (AI & IOT)",
      ar: "الذكاء الاصطناعي وإنترنت الأشياء (AI & IOT)",
    },
    "fuel-automation": {
      en: "Fuel Automation",
      ar: "أتمتة الوقود",
    },
  };

  return (
    serviceLabels[serviceValue as keyof typeof serviceLabels]?.[language] ||
    serviceValue
  );
}

function generateEmailTemplate(data: ConsultationRequestData) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Consultation Request</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #f8fafc;
        }
        
        .email-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 32px 24px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .header p {
          font-size: 16px;
          opacity: 0.9;
        }
        
        .content {
          padding: 32px 24px;
        }
        
        .section {
          margin-bottom: 40px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        
        .section-header {
          background-color: #f8fafc;
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e40af;
          text-align: center;
        }
        
        .bilingual-content {
          display: flex;
          width: 100%;
          min-height: 200px;
        }
        
        .language-column {
          width: 50%;
          padding: 24px;
          box-sizing: border-box;
        }
        
        .language-column.english {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          border-right: 2px solid #e5e7eb;
        }
        
        .language-column.arabic {
          direction: rtl;
          text-align: right;
          font-size: 16px;
        }
        
        .language-header {
          font-size: 16px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 20px;
          text-align: center;
          padding-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .info-grid {
          display: grid;
          gap: 16px;
        }
        
        .info-item {
          background-color: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
          margin-bottom: 12px;
        }
        
        .arabic .info-item {
          border-left: none;
          border-right: 4px solid #3b82f6;
        }
        
        .info-label {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          text-transform: capitalize;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .arabic .info-label {
          text-transform: none;
          font-size: 13px;
        }
        
        .info-value {
          font-size: 16px;
          color: #111827;
          font-weight: 500;
        }
        
        .arabic .info-value {
          font-size: 15px;
        }
        
        .message-box {
          background-color: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          padding: 20px;
          margin-top: 16px;
        }
        
        .message-text {
          font-size: 15px;
          line-height: 1.6;
          color: #0c4a6e;
          white-space: pre-wrap;
        }
        
        .highlight {
          background-color: #fef3c7;
          padding: 16px 20px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          margin: 24px 0;
          text-align: center;
        }
        
        .highlight-text {
          font-weight: 600;
          color: #92400e;
          font-size: 16px;
        }
        
        .footer {
          background-color: #f8fafc;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
          margin-top: 20px;
        }
        
        .footer p {
          font-size: 14px;
          color: #6b7280;
        }
        
        .timestamp {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 8px;
        }
        
        /* Outlook specific styles */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .language-column.arabic {
            font-family: 'Segoe UI Arabic', 'Tahoma', 'Arial Unicode MS', sans-serif !important;
          }
        }
        
        @media (max-width: 768px) {
          .email-container {
            margin: 0;
            border-radius: 0;
            max-width: 100%;
          }
          
          .bilingual-content {
            flex-direction: column;
          }
          
          .language-column {
            width: 100%;
          }
          
          .language-column.english {
            border-right: none;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .header, .content, .footer {
            padding: 24px 16px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🏢 GasTech | جاس تك</h1>
          <p>New Consultation Request Received | طلب استشارة جديد</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">👤 Contact Information | معلومات الاتصال</h2>
            </div>
            <div class="bilingual-content">
              <div class="language-column english">
                <div class="language-header">🇺🇸 English</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Full Name</div>
                    <div class="info-value">${data.name || "Not provided"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Email Address</div>
                    <div class="info-value">${data.email || "Not provided"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Phone Number</div>
                    <div class="info-value">${data.phone || "Not provided"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Position</div>
                    <div class="info-value">${data.position || "Not provided"}</div>
                  </div>
                </div>
              </div>
              <div class="language-column arabic">
                <div class="language-header">🇸🇦 العربية</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">الاسم الكامل</div>
                    <div class="info-value">${data.name || "غير محدد"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">البريد الإلكتروني</div>
                    <div class="info-value">${data.email || "غير محدد"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">رقم الهاتف</div>
                    <div class="info-value">${data.phone || "غير محدد"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">المنصب</div>
                    <div class="info-value">${data.position || "غير محدد"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">🏭 Company Details | تفاصيل الشركة</h2>
            </div>
            <div class="bilingual-content">
              <div class="language-column english">
                <div class="language-header">🇺🇸 English</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Company Name</div>
                    <div class="info-value">${data.companyName || "Not provided"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Service Provided</div>
                    <div class="info-value">${getServiceLabel(data.serviceProvided, "en")}</div>
                  </div>
                </div>
              </div>
              <div class="language-column arabic">
                <div class="language-header">🇸🇦 العربية</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">اسم الشركة</div>
                    <div class="info-value">${data.companyName || "غير محدد"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">الخدمة المقدمة</div>
                    <div class="info-value">${getServiceLabel(data.serviceProvided, "ar")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">⛽ Station Requirements | متطلبات المحطة</h2>
            </div>
            <div class="bilingual-content">
              <div class="language-column english">
                <div class="language-header">🇺🇸 English</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Number of Stations</div>
                    <div class="info-value">${data.stationsCount || "Not specified"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Pumps per Station</div>
                    <div class="info-value">${data.pumpsPerStation || "Not specified"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Nozzles per Pump</div>
                    <div class="info-value">${data.nozzlesPerPump || "Not specified"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Number of Tanks</div>
                    <div class="info-value">${data.tanksCount || "Not specified"}</div>
                  </div>
                </div>
              </div>
              <div class="language-column arabic">
                <div class="language-header">🇸🇦 العربية</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">عدد المحطات</div>
                    <div class="info-value">${data.stationsCount || "غير محدد"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">المضخات لكل محطة</div>
                    <div class="info-value">${data.pumpsPerStation || "غير محدد"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">الفوهات لكل مضخة</div>
                    <div class="info-value">${data.nozzlesPerPump || "غير محدد"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">عدد الخزانات</div>
                    <div class="info-value">${data.tanksCount || "غير محدد"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          ${
            data.serviceProvided
              ? `
          <div class="highlight">
            <div class="highlight-text">
              🎯 Demo Requested | طلب عرض توضيحي<br>
              <span style="font-size: 14px; font-weight: normal;">This client is interested in a product demonstration | هذا العميل مهتم بعرض توضيحي للمنتج</span>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            data.message
              ? `
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">💬 Additional Message | رسالة إضافية</h2>
            </div>
            <div class="bilingual-content">
              <div class="language-column english">
                <div class="language-header">🇺🇸 English</div>
                <div class="message-box">
                  <div class="message-text">${data.message}</div>
                </div>
              </div>
              <div class="language-column arabic">
                <div class="language-header">🇸🇦 العربية</div>
                <div class="message-box">
                  <div class="message-text">${data.message}</div>
                </div>
              </div>
            </div>
          </div>
          `
              : ""
          }
        </div>
        
        <div class="footer">
          <p><strong>GasTech Consultation System | نظام استشارات جاس تك</strong></p>
          <p>This email was automatically generated from your website contact form | تم إنشاء هذا البريد الإلكتروني تلقائياً من نموذج الاتصال في موقعكم</p>
          <div class="timestamp">Received on ${new Date().toLocaleString(
            "en-US",
            {
              timeZone: "Asia/Riyadh",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            }
          )} | تم الاستلام في ${new Date().toLocaleDateString("ar-SA", {
            timeZone: "Asia/Riyadh",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
