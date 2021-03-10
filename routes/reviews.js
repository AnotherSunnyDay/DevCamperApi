const express = require('express');
const { getReviews, getReview, addReview } = require('../controllers/reviews');
const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);
router.route('/:id').get(getReview);
//   .put(protect, authorize('publisher', 'admin'), updateReviews)
//   .delete(protect, authorize('publisher', 'admin'), deleteReviews);

module.exports = router;
