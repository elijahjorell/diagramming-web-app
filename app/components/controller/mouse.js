function mousePressed() {
    if (document.activeElement.tagName === 'TEXTAREA') {
        cGrabEnd();
        cEditItemTextBoxEnd();
    }

    // if clicked on canvas
    if (document.activeElement.tagName === 'BODY') {
        if (mouseButton === LEFT) {
            // while mItems.database are selected
            if (cSelect.IDs.length > 0) { 
                // click on canvas
                if (mCursor.IDs.front === undefined) {
                    cSelectEnd();
                    cSelectAreaBegin();
                // click on a selected item
                } else if (cSelect.IDs.includes(mCursor.IDs.front)) {
                    cGrabBegin(cSelect.IDs);
                // click on a non-selected item
                } else {
                    cSelectEnd();
                    cSelectBegin(mCursor.IDs.front);
                    cGrabBegin(cSelect.IDs);
                }
            // while nothing is grabbed or selected
            } else { 
                // click on the canvas
                if (mCursor.IDs.front === undefined) {
                    cSelectAreaBegin();
                // click on item
                } else {
                    cSelectBegin(mCursor.IDs.front);
                    cGrabBegin(cSelect.IDs);
                }
            }
        } else if (mouseButton === CENTER) {
            cPanBegin();
        }
    }
}

function doubleClicked() {
    if (document.activeElement.tagName === 'BODY') {
        if (mouseButton === LEFT) {
            if (mCursor.components.selected.textBoxID !== undefined) {
                cEditItemTextBoxBegin(mCursor.IDs.front);
            }
        }
    }
} 

function mouseReleased() {
    if (document.activeElement.tagName === 'BODY') {
        if (mouseButton === LEFT) {
            if (cSelectArea.active) {
                cSelectBegin(cSelectArea.IDs);
                cSelectAreaEnd();
            } else {
                cGrabEnd();
            }
        } else if (mouseButton === CENTER) {
            cPanEnd();
        }
    }
}

function mouseWheel(event) {
    cZoomOn(event);
}

function mouseDisableAutoscroll() {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 1) {
        e.preventDefault();
      }
    });
}

mouseDisableAutoscroll();