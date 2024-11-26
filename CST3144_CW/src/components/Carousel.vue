<template>
    <!-- Carousel layout for slideshow -->
     <div id="slideshow" class="carousel slide mx-0 mb-3" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#slideshow" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#slideshow" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#slideshow" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner carouselHeight bg-dark">
            <div class="carousel-item active h-100">
                <div class="d-flex justify-content-center">
                    <img class="d-block w-75 img-fluid" src="https://www.ppic.org/wp-content/uploads/DiverseCollegeStudents-640x288.jpg" alt="Slide 1">
                </div>
            </div>
            <div class="carousel-item h-100">
                <div class="d-flex justify-content-center">
                    <img class="d-block w-75 img-fluid" src="https://online.maryville.edu/wp-content/uploads/sites/97/2023/09/high-school-math-teacher.jpg" alt="Slide 2">
                </div>
            </div>
            <div class="carousel-item h-100">
                <div class="d-flex justify-content-center">
                    <img class="d-block w-75 img-fluid" src="https://www.tltp.co.uk/webpstore/images/Primaryteacherclass.webp" alt="Slide 3">
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#slideshow" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#slideshow" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
     </div>
</template>