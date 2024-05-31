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
  if (!ref.current) return null;

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
      ancestor.classList.add('expand');

      // Add 'collapsed' class to other top-level divs in ref.current
      Array.from(ref.current.children).forEach(child => {
        if (child !== ancestor) {
          child.classList.add('collapse');
          child.classList.remove('expand');
        }
      });
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }

  return null;
}


export { getClassNameAtPosition, findAncestorWithIdAndToggleClass }