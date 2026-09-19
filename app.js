/* --------------------------------------------------
   Velantra Boutique Hotel - Client Application Script
-------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // Room display names
    const ROOM_NAMES = {
        standard: 'Standard',
        deluxe: 'Deluxe',
        'super-deluxe': 'Super Deluxe'
    };

    /* ==================================================
       1. SET DEFAULT BOOKING DATES
       ================================================== */
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2); // 2-night default stay
        
        // Format to YYYY-MM-DD
        const formatDate = (date) => {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };
        
        checkinInput.value = formatDate(tomorrow);
        checkoutInput.value = formatDate(dayAfterTomorrow);
        
        // Set min attributes to prevent booking past dates
        checkinInput.min = formatDate(today);
        checkoutInput.min = formatDate(tomorrow);
        
        // Dynamic minimum check-out date based on check-in
        checkinInput.addEventListener('change', () => {
            const checkinVal = new Date(checkinInput.value);
            const nextDay = new Date(checkinVal);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.min = formatDate(nextDay);
            
            // Adjust check-out if it falls behind check-in
            if (new Date(checkoutInput.value) <= checkinVal) {
                checkoutInput.value = formatDate(nextDay);
            }
        });
    }

    /* ==================================================
       2. STICKY HEADER & SCROLL EFFECTS
       ================================================== */
    const header = document.getElementById('mainHeader');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately to check initial state

    // Smooth scroll for hero scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* ==================================================
       3. MOBILE NAVIGATION NAVIGATION
       ================================================== */
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    const closeMobileMenu = () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ==================================================
       4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .card-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop tracking once visible
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px'
        });
        
        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(elem => {
            elem.classList.add('visible');
        });
    }

    /* ==================================================
       5. MODALS & POPUPS SYSTEM
       ================================================== */
    // Helper to open a modal
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    };

    // Helper to close a modal
    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    };

    // Attach click listeners to all close buttons
    const closeBtns = document.querySelectorAll('.modal-close, .lightbox-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetModal = e.target.closest('.modal') || e.target.closest('.lightbox');
            if (targetModal) {
                targetModal.classList.remove('active');
                if (targetModal.id === 'galleryLightbox') {
                    targetModal.style.display = 'none';
                }
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Close modal on background click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        if (e.target.classList.contains('lightbox')) {
            e.target.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });

    /* ==================================================
       6. RESERVATION FLOW & CALCULATIONS
       ================================================== */
    const quickBookingForm = document.getElementById('quickBookingForm');
    const bookingModal = document.getElementById('bookingModal');
    
    // Booking details display fields inside modal
    const summaryRoom = document.getElementById('summary-room');
    const summaryIn = document.getElementById('summary-in');
    const summaryOut = document.getElementById('summary-out');
    const summaryNights = document.getElementById('summary-nights');
    const summaryGuests = document.getElementById('summary-guests');

    // Set up the modal contents
    const processBookingDetails = (room, checkinDateStr, checkoutDateStr, guestsCount) => {
        const inDate = new Date(checkinDateStr);
        const outDate = new Date(checkoutDateStr);
        
        // Calculate nights
        const timeDiff = outDate.getTime() - inDate.getTime();
        const nightsCount = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
        
        // Set modal HTML content
        if (summaryRoom) summaryRoom.textContent = ROOM_NAMES[room] || room;
        if (summaryIn) summaryIn.textContent = checkinDateStr;
        if (summaryOut) summaryOut.textContent = checkoutDateStr;
        if (summaryNights) summaryNights.textContent = nightsCount;
        if (summaryGuests) summaryGuests.textContent = guestsCount;
        
        // Open modal
        openModal('bookingModal');
    };

    // Handle Quick Booking Form Submit
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const roomVal = document.getElementById('room-type').value;
            const checkinVal = checkinInput.value;
            const checkoutVal = checkoutInput.value;
            const guestsVal = document.getElementById('guests').value;
            
            processBookingDetails(roomVal, checkinVal, checkoutVal, guestsVal);
        });
    }

    // Bind "Book Room" buttons on specific Room cards
    const roomBookBtns = document.querySelectorAll('.btn-book-room');
    roomBookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedRoom = e.target.getAttribute('data-room');
            
            // Get current values from the booking bar or default to tomorrow/day-after
            let checkinVal = checkinInput ? checkinInput.value : '';
            let checkoutVal = checkoutInput ? checkoutInput.value : '';
            let guestsVal = '2'; // Default
            
            if (!checkinVal) {
                const today = new Date();
                const tmrw = new Date(today);
                tmrw.setDate(tmrw.getDate() + 1);
                const nextDay = new Date(tmrw);
                nextDay.setDate(nextDay.getDate() + 2);
                
                const formatDate = (date) => {
                    const y = date.getFullYear();
                    const m = String(date.getMonth() + 1).padStart(2, '0');
                    const d = String(date.getDate()).padStart(2, '0');
                    return `${y}-${m}-${d}`;
                };
                checkinVal = formatDate(tmrw);
                checkoutVal = formatDate(nextDay);
            }
            
            processBookingDetails(selectedRoom, checkinVal, checkoutVal, guestsVal);
        });
    });

    /* ==================================================
       7. TABLE RESERVATIONS (DINING) & EVENT INQUIRIES
       ================================================== */
    const openReserveTableBtn = document.getElementById('openReserveTableBtn');
    const openBanquetInquiryBtn = document.getElementById('openBanquetInquiryBtn');
    const diningDateInput = document.getElementById('dine-date');
    const banquetDateInput = document.getElementById('bq-date');

    // Populate dining & banquet modal dates with tomorrow by default
    const setModalDefaultDates = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        
        if (diningDateInput) {
            diningDateInput.value = dateStr;
            diningDateInput.min = dateStr;
        }
        if (banquetDateInput) {
            banquetDateInput.value = dateStr;
            banquetDateInput.min = dateStr;
        }
    };
    setModalDefaultDates();

    if (openReserveTableBtn) {
        openReserveTableBtn.addEventListener('click', () => {
            openModal('diningModal');
        });
    }

    if (openBanquetInquiryBtn) {
        openBanquetInquiryBtn.addEventListener('click', () => {
            openModal('banquetModal');
        });
    }

    /* ==================================================
       8. TOAST NOTIFICATIONS & FORM SUBMISSIONS
       ================================================== */
    const toast = document.getElementById('toastNotification');
    const toastTitle = toast ? toast.querySelector('.toast-title') : null;
    const toastMessage = toast ? toast.querySelector('.toast-message') : null;

    const showToast = (title, message) => {
        if (toast && toastTitle && toastMessage) {
            toastTitle.textContent = title;
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }
    };

    // Generic simulated form submission feedback
    const handleFormSubmit = (formId, modalId, successTitle, successMsg) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // If inside a modal, close it
                if (modalId) {
                    closeModal(modalId);
                }
                
                // Show success notification
                showToast(successTitle, successMsg);
                
                // Reset fields
                form.reset();
                if (formId === 'bookingConfirmForm') {
                    setModalDefaultDates();
                }
            });
        }
    };

    handleFormSubmit('bookingConfirmForm', 'bookingModal', 'Stay Booked', 'Your room reservation request has been processed. A booking voucher has been sent to your email.');
    handleFormSubmit('diningConfirmForm', 'diningModal', 'Table Reserved', 'Your table at The Russet Bistro has been reserved. A confirmation SMS has been sent.');
    handleFormSubmit('banquetConfirmForm', 'banquetModal', 'Inquiry Received', 'Thank you! Our event coordinator will contact you with details and a quote shortly.');
    handleFormSubmit('contactForm', null, 'Message Sent', 'Thank you for reaching out. The Velantra customer care desk will reply within 24 hours.');
    
    // Newsletter Submit
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed', 'Thank you for subscribing to Velantra insights and promotions.');
            newsletterForm.reset();
        });
    }

    /* ==================================================
       9. GALLERY CATEGORY FILTER & LIGHTBOX
       ================================================== */
    const filterBtns = document.querySelectorAll('#galleryFilters .filter-btn');
    const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');
                
                if (category === 'all' || itemCat === category) {
                    item.style.display = 'block';
                    // Trigger reflow for fade-in transition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // match transition duration
                }
            });
        });
    });

    // Lightbox Logic
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const cat = item.querySelector('.gallery-cat').textContent;
            const title = item.querySelector('.gallery-title').textContent;
            
            if (lightbox && lightboxImg && lightboxCaption) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = `${cat} — ${title}`;
                
                lightbox.style.display = 'flex';
                document.body.classList.add('no-scroll');
            }
        });
    });

    /* ==================================================
       10. TESTIMONIAL SLIDER/CAROUSEL
       ================================================== */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        testimonialCards.forEach(card => card.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        sliderDots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let index = currentSlide + 1;
        if (index >= testimonialCards.length) {
            index = 0;
        }
        showSlide(index);
    };

    const startSlideShow = () => {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 6000); // Rotate every 6 seconds
    };

    const stopSlideShow = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    };

    // Attach click triggers to dots
    sliderDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            showSlide(index);
            startSlideShow(); // Reset timer
        });
    });

    // Toggle slide rotation on mouse hover (improves UX)
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideShow);
        sliderContainer.addEventListener('mouseleave', startSlideShow);
    }

    // Start carousel rotation
    if (testimonialCards.length > 0) {
        startSlideShow();
    }
});
