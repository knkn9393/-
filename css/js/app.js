 document.addEventListener('DOMContentLoaded', function() {
    // Handle rate app button click
    const rateAppBtn = document.getElementById('rate-app');
    if (rateAppBtn) {
        rateAppBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal for rating
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <h2>تقييم التطبيق</h2>
                    <div class="stars">
                        <i class="far fa-star" data-value="1"></i>
                        <i class="far fa-star" data-value="2"></i>
                        <i class="far fa-star" data-value="3"></i>
                        <i class="far fa-star" data-value="4"></i>
                        <i class="far fa-star" data-value="5"></i>
                    </div>
                    <textarea placeholder="أخبرنا برأيك حول التطبيق..."></textarea>
                    <button class="submit-rating">إرسال التقييم</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add styles for modal
            const style = document.createElement('style');
            style.textContent = `
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                }
                
                .close-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 24px;
                    cursor: pointer;
                }
                
                .stars {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin: 20px 0;
                    font-size: 30px;
                }
                
                .stars i {
                    cursor: pointer;
                    color: #ddd;
                }
                
                .stars i.fas {
                    color: gold;
                }
                
                textarea {
                    width: 100%;
                    height: 100px;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    resize: none;
                    font-family: 'Amiri', serif;
                }
                
                .submit-rating {
                    background-color: #8D5524;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                
                .submit-rating:hover {
                    background-color: #D68438;
                }
            `;
            
            document.head.appendChild(style);
            
            // Handle star rating
            const stars = document.querySelectorAll('.stars i');
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    
                    // Reset all stars
                    stars.forEach(s => {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    });
                    
                    // Fill stars up to selected value
                    for (let i = 0; i < value; i++) {
                        stars[i].classList.remove('far');
                        stars[i].classList.add('fas');
                    }
                });
            });
            
            // Close modal
            const closeBtn = document.querySelector('.close-btn');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
            
            // Submit rating
            const submitBtn = document.querySelector('.submit-rating');
            submitBtn.addEventListener('click', function() {
                const rating = document.querySelectorAll('.stars i.fas').length;
                const feedback = document.querySelector('textarea').value;
                
                // Would normally send this data to a server
                alert(`شكراً لتقييمك! قيمت التطبيق بـ ${rating} نجوم.`);
                
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
        });
    }
});
