document.querySelector('.slick-list').addEventListener('mouseenter', () => {
  document.querySelector('.slick-prev').style.opacity = '1';
  document.querySelector('.slick-next').style.opacity = '1';
});

document.querySelector('.slick-list').addEventListener('mouseleave', () => {
  document.querySelector('.slick-prev').style.opacity = '';
  document.querySelector('.slick-next').style.opacity = '';
});

document.addEventListener('mouseover', (event) => {
  const allSlickCurrents = document.querySelectorAll('.slick-current');
  const allSlickTargets = document.querySelectorAll('.slick-target');
  const allSlickSlides = document.querySelectorAll('.slick-slide');

  const getClosestAnchorHref = (element) => {
    const anchor = element?.closest('a');
    return anchor ? anchor.getAttribute('href') : null;
  };
  const applyStyles = (element, isImage = false) => {
    if (isImage) {
      element.style.cursor = 'pointer';
      element.style.outline = '0.25vw solid #58aafc';
      element.style.boxShadow = '0px 0px 12px #58aafc, 0px 0px 10px #58aafc';
      element.style.transition = 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline 0.15s ease-in-out';
    } else { // Fixes text flicker
      element.style.opacity = '1';
      element.style.transition = 'opacity 0.15s ease-in-out';
    }
  };
  
  const resetStyles = (element, isImage = false) => {
    if (isImage) {
      element.style.cursor = 'default';
      element.style.outline = '0.25vw solid transparent';
      element.style.boxShadow = '0px 0px 7px #000';
      element.style.transition = 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline 0.15s ease-in-out';
    } else {  // Fixes text flicker
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.15s ease-in-out';
    } 
  };
  

  const hoveredSlickCurrent = event.target.closest('.slick-current');
  const hoveredSlickTarget = event.target.closest('.slick-target');

  // Handle hover for .slick-current
  if (hoveredSlickCurrent) {
    const currentHref = getClosestAnchorHref(hoveredSlickCurrent);
     // Apply styles to the hovered .slick-current
     hoveredSlickCurrent.querySelectorAll('p').forEach(p => applyStyles(p));
     hoveredSlickCurrent.querySelectorAll('img').forEach(img => applyStyles(img, true));

     // Check and apply styles to matching .slick-targets
     allSlickTargets.forEach(target => {
       if (getClosestAnchorHref(target) === currentHref) {
         target.querySelectorAll('p').forEach(p => applyStyles(p));
         target.querySelectorAll('img').forEach(img => applyStyles(img, true));
       } else {
         // Reset styles for non-matching .slick-targets
         target.querySelectorAll('p').forEach(p => resetStyles(p));
         target.querySelectorAll('img').forEach(img => resetStyles(img, true));
       }
     });
   } else {
     // Reset styles for .slick-current when not hovered
     allSlickCurrents.forEach(current => {
       current.querySelectorAll('p').forEach(p => resetStyles(p));
       current.querySelectorAll('img').forEach(img => resetStyles(img, true));
     });
   }

   // Handle hover for .slick-target
   if (hoveredSlickTarget) {
     const targetHref = getClosestAnchorHref(hoveredSlickTarget);

     // Apply styles to the hovered .slick-target
     hoveredSlickTarget.querySelectorAll('p').forEach(p => applyStyles(p));
     hoveredSlickTarget.querySelectorAll('img').forEach(img => applyStyles(img, true));

     // Check and apply styles to matching .slick-currents
     allSlickCurrents.forEach(current => {
       if (getClosestAnchorHref(current) === targetHref) {
         current.querySelectorAll('p').forEach(p => applyStyles(p));
         current.querySelectorAll('img').forEach(img => applyStyles(img, true));
       } else {
         // Reset styles for non-matching .slick-currents
         current.querySelectorAll('p').forEach(p => resetStyles(p));
         current.querySelectorAll('img').forEach(img => resetStyles(img, true));
       }
     });
   } else {
     // Reset styles for .slick-target when not hovered
     allSlickTargets.forEach(target => {
       target.querySelectorAll('p').forEach(p => resetStyles(p));
       target.querySelectorAll('img').forEach(img => resetStyles(img, true));
     });
   }

   // Reset styles for non-matching .slick-slide elements
   allSlickSlides.forEach(slide => {
     if (!slide.classList.contains('slick-current') && !slide.classList.contains('slick-target')) {
       slide.querySelectorAll('p').forEach(p => resetStyles(p));
       slide.querySelectorAll('img').forEach(img => resetStyles(img, true));
     }
   });
 });

 document.addEventListener('mouseout', (event) => {
   const isHovering = document.querySelector(':hover'); // Check if the mouse is hovering over any element
   if (!isHovering || (!event.relatedTarget?.closest('.slick-current') && !event.relatedTarget?.closest('.slick-target'))) {
     // Reset all styles when neither .slick-current nor .slick-target is hovered
     document.querySelectorAll('.slick-current p, .slick-target p').forEach(p => resetStyles(p));
     document.querySelectorAll('.slick-current img, .slick-target img').forEach(img => resetStyles(img, true));

     // Reset styles for all .slick-slide elements (non .slick-current or .slick-target)
     document.querySelectorAll('.slick-slide p, .slick-slide img').forEach(el => resetStyles(el));
   }
 });

