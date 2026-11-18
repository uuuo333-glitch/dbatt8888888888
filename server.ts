import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Google GenAI with recommended telemetry
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    })
  : null;

// AI Route: Generate product title, description, and SEO specs for exhaust and pollution filters
app.post('/api/gemini/generate-product-content', async (req, res) => {
  try {
    const {
      carModel,
      fuelType = 'diesel',
      category = 'dpf_filter',
      keywords = ''
    } = req.body;

    const fuelLabel = fuelType === 'diesel' ? 'ديزل DPF' : fuelType === 'petrol' ? 'بنزين Catalytic' : 'شامل ديزل وبنزين';
    const categoryLabel =
      category === 'dpf_filter'
        ? 'فلتر ديزل DPF'
        : category === 'catalytic_petrol'
        ? 'دبة بيئة بنزين'
        : category === 'sport_cat'
        ? 'دبة رياضية 300 خلية High Flow'
        : category === 'o2_sensor'
        ? 'حساس أوكسجين وشكمان'
        : 'منظف وبخاخ كربون DPF';

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        title: `${categoryLabel} أصلي وكالة - ${carModel || 'متعدد الموديلات'}`,
        titleEn: `OEM ${categoryLabel} for ${carModel || 'Universal'}`,
        description: `منتج عالي الجودة مصنع خصيصاً لسيارات ${carModel || 'الديزل والبنزين'}. يضمن القضاء التام على الدخان الأسود وانبعاثات الكربون واجتياز الفحص الدوري بنسبة 100% بدون أي لمبة فحص محرك، مصنع من خامات مقاومة للحرارة العالية مع تدفق هوائي مثالي.`,
        oemNumber: `OEM-${Math.floor(10000 + Math.random() * 90000)}-${fuelType === 'diesel' ? 'DPF' : 'CAT'}`,
        filtrationEfficiency: '99.4% تصفية كربون وسناج معتمدة',
        suggestedPrice: fuelType === 'diesel' ? 1850 : 1450,
        seoKeywords: `دبة تلوث ${carModel}, فلتر ديزل DPF, فحص دوري, كربون شكمان, ${keywords}`,
        isAiGenerated: true,
        source: 'smart_fallback'
      });
    }

    const prompt = `أنت خبير محترف ومسوق لأنظمة عوادم السيارات ودبات التلوث وفلاتر الديزل والبنزين في السوق السعودي والخليجي.
المطلوب: قم بتوليد بيانات منتج متكاملة ومحترفة وجذابة لمتجر إلكتروني بناءً على المعطيات التالية:
- نوع السيارة والموديل: ${carModel || 'سيارات دفع رباعي وشاحنات ديزل وبنزين'}
- نوع الوقود: ${fuelLabel}
- التصنيف: ${categoryLabel}
- كلمات دلالية إضافية: ${keywords || 'اجتياز الفحص الدوري، عزم قوي، مطابقة للمواصفات'}

يجب أن تكون المخرجات بصيغة JSON حصراً، وتحتوي على الحقول التالية:
1. title: عنوان عربي احترافي وجذاب وجاهز للظهور في بحث Google (بين 40-70 حرف).
2. titleEn: عنوان باللغة الإنجليزية للمنتج.
3. description: وصف تسويقي مقنع (3-4 جمل) يوضح الكفاءة، حل مشاكل لمبة المكينة (Check Engine)، اجتياز الفحص الدوري، وخامات التصنيع.
4. oemNumber: رقم قطعة مقترح OEM بصيغة واقعية.
5. filtrationEfficiency: نسبة كفاءة فلترة الغازات (مثال: "99.4% كفاءة تصفية جزيئات الكربون والدخان").
6. suggestedPrice: سعر مقترح واقعي بالريال السعودي (رقم صحيح).
7. seoKeywords: قائمة كلمات مفتاحية لمحركات البحث مفصولة بفواصل.

أرجع فقط كود JSON بدون أي نصوص تمهيدية.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const outputText = response.text || '{}';
      let parsedData = {};
      try {
        parsedData = JSON.parse(outputText);
      } catch {
        parsedData = {
          title: `${categoryLabel} أصلي - ${carModel}`,
          description: outputText
        };
      }

      return res.json({
        ...parsedData,
        isAiGenerated: true,
        source: 'gemini-3.8-flash'
      });
    } catch (apiError: any) {
      console.warn('Gemini API call encountered error, using smart fallback generator:', apiError?.message);
      return res.json({
        title: `${categoryLabel} عالي الأداء معتمد - ${carModel || 'موديلات حديثة'}`,
        titleEn: `High Performance ${categoryLabel} for ${carModel || 'Universal'}`,
        description: `دبة تلوث وفلتر بيئة متطور لسيارات ${carModel || 'المختلفة'}، مخصص لاجتياز الفحص الدوري بدقة متناهية والتخلص من روائح الكربون والدخان. مصنع بطبقات كورديريت وسيراميك لتحمل درجات الحرارة العالية بدون كتم العزم.`,
        oemNumber: `OEM-${Math.floor(10000 + Math.random() * 90000)}-${fuelType === 'diesel' ? 'DPF' : 'CAT'}`,
        filtrationEfficiency: '99.5% كفاءة تصفية غازات وانبعاثات',
        suggestedPrice: fuelType === 'diesel' ? 1850 : 1550,
        seoKeywords: `دبة تلوث ${carModel}, فلتر ديزل DPF, دبة بيئة, فحص دوري, كربون شكمان`,
        isAiGenerated: true,
        source: 'smart_fallback'
      });
    }
  } catch (error: any) {
    console.error('Server error in generate-product-content:', error);
    return res.status(500).json({
      error: 'فشل في توليد المحتوى',
      details: error.message
    });
  }
});

// Mount Vite or serve static in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
