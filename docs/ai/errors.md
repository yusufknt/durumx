# Hata Yönetimi (Error Handling) Kuralları

- Uygulama içinde **hiçbir zaman** doğrudan `console.error()` veya `console.log()` kullanılarak hata basılmamalıdır.
- Hata yakalanması gereken yerlerde (`catch` blokları) daima `src/utils/errorHandler.ts` içindeki `handleError` fonksiyonunu kullan.

**Örnek Kullanım:**
```tsx
import { handleError } from '@/utils/errorHandler';

try {
  // riskli işlemler
} catch (error) {
  handleError(error, "Veri fetch işlemi başarısız");
}
```
