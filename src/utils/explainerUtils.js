/* Animation Utils 
  source: https://codepen.io/brundolf/pen/dvoGyw, 
  https://css-tricks.com/using-css-transitions-auto-dimensions/
*/
function collapseSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;
  
  // temporarily disable all css transitions
  var elementTransition = element.style.transition;
  element.style.transition = '';
  
  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we 
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function() {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;
    
    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 12px
    requestAnimationFrame(function() {
      element.style.height = 12 + 'px';
      element.style.marginBottom = 4 + 'px';
    });
  });
  
  // mark the section as "currently collapsed"
  element.setAttribute('data-collapsed', 'true');
}

function expandSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;
  
  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + 'px';
  element.style.marginBottom = 24 + 'px';

  // named function to handle the transitionend event
  function onTransitionEnd(e) {
    // remove this event listener so it only gets triggered once
    element.removeEventListener('transitionend', onTransitionEnd);
    
    // remove "height" from the element's inline styles, so it can return to its initial value
    element.style.height = null;
  }

  // when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener('transitionend', onTransitionEnd);
  
  // mark the section as "currently not collapsed"
  element.setAttribute('data-collapsed', 'false');
}

// function expandSection(element) {
//   // get the height of the element's inner content, regardless of its actual size
//   var sectionHeight = element.scrollHeight;
  
//   // have the element transition to the height of its inner content
//   element.style.height = sectionHeight + 'px';

//   // when the next css transition finishes (which should be the one we just triggered)
//   element.addEventListener('transitionend', function(e) {
//     // remove this event listener so it only gets triggered once
//     element.removeEventListener('transitionend', arguments.callee);
    
//     // remove "height" from the element's inline styles, so it can return to its initial value
//     element.style.height = null;
//   });
  
//   // mark the section as "currently not collapsed"
//   element.setAttribute('data-collapsed', 'false');
// }

// document.querySelector('#toggle-button').addEventListener('click', function(e) {
//   var section = document.querySelector('.section.collapsible');
//   var isCollapsed = section.getAttribute('data-collapsed') === 'true';
    
//   if(isCollapsed) {
//     expandSection(section)
//     section.setAttribute('data-collapsed', 'false')
//   } else {
//     collapseSection(section)
//   }
// });


/* */
function getClassNameAtPosition(innerHTML, position) {
  // Create a temporary div to parse the innerHTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = innerHTML;
  
  // Initialize a counter to keep track of the position within the text content
  let currentPosition = 0;
  
  // Get all the span elements
  const spans = tempDiv.querySelectorAll('span');
  
  // Iterate through all span elements
  for (const span of spans) {
      const spanText = span.textContent;
      const spanLength = spanText.length;
      
      // Check if the given position falls within the current span's text content
      if (currentPosition <= position && position < currentPosition + spanLength) {
          // Return the class of the span element
          return span.className;
      }
      
      // Update the current position
      currentPosition += spanLength;
  }
  
  // If position is out of bounds, return null or an appropriate message
  return null;
}

function escapeClassName(className) {
  return className.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, '\\$1');
}

function findAncestorWithIdAndToggleClass(ref, className) {
  if (!ref.current || className == null) return null;

  // Escape the className for querySelector
  const escapedClassName = escapeClassName(className);

  console.log('looking for className: ', escapedClassName);
  // Find the element with the specified className
  const targetElement = ref.current.querySelector(`.${escapedClassName}`);
  if (!targetElement) return null;

  // Traverse up the DOM tree to find the ancestor with an id attribute
  let ancestor = targetElement.parentElement;
  while (ancestor) {
    if (ancestor.id) {
      // Add 'collapsed' class to other top-level divs in ref.current
      Array.from(ref.current.children).forEach(child => {
        if (child !== ancestor) {
          console.log('collapseSection: ', child)
          collapseSection(child);
          // child.classList.add('collapse');
          // child.classList.remove('expand');
        }
      });
      // ancestor.classList.remove('collapse');
      // ancestor.classList.add('expand');
      console.log('expandSection: ', ancestor)
      expandSection(ancestor);
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }

  return null;
}

function updateExpandCollapsedDivs(ref, className) {
  const toToggle = findAncestorWithIdAndToggleClass(ref, className)
  console.log('toggle: ', toToggle);
  return toToggle
}

export { getClassNameAtPosition, findAncestorWithIdAndToggleClass, updateExpandCollapsedDivs }