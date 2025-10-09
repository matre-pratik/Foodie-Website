// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: "#nextBtn",
    prevEl: "#prevBtn",
  },
});

// Load existing reviews from JSON Server
function loadReviews() {
  fetch("http://localhost:3000/reviews")
    .then((res) => res.json())
    .then((reviews) => {
      swiper.removeAllSlides(); 
      reviews.forEach((review) => {
        const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
        const slide = `
          <div class="swiper-slide">
            <div class="review-card">
              <h4>${review.name}</h4>
              <div class="rating">${stars}</div>
              <p>${review.comment}</p>
            </div>
          </div>
        `;
        swiper.appendSlide(slide);
      });
    })
    .catch((err) => console.error("Error loading reviews:", err));
}

window.addEventListener("DOMContentLoaded", loadReviews);

// Form 
const form = document.querySelector(".reviewForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const rating = Number(document.querySelector("#rating").value);
  const comment = document.querySelector("#comment").value.trim();

  if (!name || !comment || rating < 1 || rating > 5) return;

  const reviewData = { name, rating, comment };

  //  Save to JSON Server
  fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Saved:", data);

      // Add new slide
      const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
      const slide = `
        <div class="swiper-slide">
          <div class="review-card">
            <h4>${data.name}</h4>
            <div class="rating">${stars}</div>
            <p>${data.comment}</p>
          </div>
        </div>
      `;
      swiper.prependSlide(slide);
      form.reset();
    })
    .catch((err) => console.error("Error saving data:", err));
});
