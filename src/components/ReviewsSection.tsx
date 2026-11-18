import React, { useState } from 'react';
import { ProductReview } from '../types';
import { useApp } from '../context/AppContext';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Car,
  UserCheck
} from 'lucide-react';

interface ReviewsSectionProps {
  productId: string;
  productName: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  productId,
  productName
}) => {
  const { getProductReviews, addReview, currentUser } = useApp();
  const reviews = getProductReviews(productId);

  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState((currentUser as any)?.fullName || '');
  const [carModel, setCarModel] = useState('');
  const [comment, setComment] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5.0;

  // Rating breakdown counts
  const starCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100
        : 0
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(productId, {
      authorName: authorName.trim() || 'عميل موثق',
      rating,
      carModel: carModel.trim() || 'سيارة ديزل / بنزين',
      comment: comment.trim(),
      isVerified: true,
      recommend
    });

    setSubmittedMessage(true);
    setComment('');
    setTimeout(() => {
      setSubmittedMessage(false);
      setFormOpen(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-800">
      {/* Header & Overall Rating Breakdown */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Left: Big Score */}
        <div className="flex items-center gap-4">
          <div className="text-center p-3 rounded-xl bg-slate-950 border border-amber-500/30">
            <span className="text-4xl font-black text-amber-400 font-mono block">
              {avgRating.toFixed(1)}
            </span>
            <div className="flex items-center justify-center gap-0.5 my-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(avgRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-400">
              {reviews.length} تقييم حقيقي
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              تقييمات وتجارب العملاء مع {productName}
            </h4>
            <p className="text-xs text-slate-400">
              جميع التقييمات من مشترين حقيقيين بعد التركيب واجتياز الفحص الدوري
            </p>
          </div>
        </div>

        {/* Middle: Rating bars */}
        <div className="w-full md:w-64 space-y-1">
          {starCounts.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-2 text-xs">
              <span className="w-6 text-slate-400 font-mono text-left">{stars} ★</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-6 text-slate-500 font-mono text-[10px]">{count}</span>
            </div>
          ))}
        </div>

        {/* Right: Add Review Button */}
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{formOpen ? 'إلغاء التقييم' : 'أضف تقييمك وتجربتك'}</span>
        </button>
      </div>

      {/* Review Submission Form */}
      {formOpen && (
        <form
          onSubmit={handleSubmitReview}
          className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-4"
        >
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            <span>كتابة مراجعة وتقييم للمنتج</span>
          </h4>

          {/* Star selector */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">تقييمك الإجمالي:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-amber-400 font-bold mr-2">
                {rating === 5
                  ? 'ممتاز جداً (5/5)'
                  : rating === 4
                  ? 'جيد جداً (4/5)'
                  : rating === 3
                  ? 'متوسط (3/5)'
                  : 'يحتاج تحسين'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">اسمك الكريم:</label>
              <input
                type="text"
                placeholder="مثال: خالد العتيبي"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                نوع وموديل سيارتك (مهم للعملاء):
              </label>
              <input
                type="text"
                placeholder="مثال: تويوتا هايلوكس 2.8 ديزل 2021"
                value={carModel}
                onChange={e => setCarModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">
              تفاصيل تجربتك (كيف كانت الانبعاثات، اجتياز الفحص، صوت الشكمان):
            </label>
            <textarea
              required
              rows={3}
              placeholder="اكتب تجربتك بكل أمانة لمساعدة زوار المتجر..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={recommend}
                onChange={e => setRecommend(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span>نعم، أوصي بشراء هذه الدبة لأصحاب نفس السيارة</span>
            </label>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              نشر التقييم فوراً
            </button>
          </div>

          {submittedMessage && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم إضافة تقييمك بنجاح! شكراً لمشاركتك المفيدة.</span>
            </div>
          )}
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            لا توجد تقييمات سابقة لهذا المنتج حتى الآن. كن أول من يقيّم!
          </div>
        ) : (
          reviews.map(review => (
            <div
              key={review.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">
                    {review.authorName}
                  </span>
                  {review.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <UserCheck className="w-3 h-3" />
                      مشتري موثق
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 font-mono">
                  {review.date}
                </span>
              </div>

              {/* Stars & Car */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {review.carModel && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Car className="w-3 h-3 text-amber-400" />
                    {review.carModel}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {review.comment}
              </p>

              {review.recommend && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 pt-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>يوصي باقتناء هذا المنتج</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
