function cStructureSetParentOfIDsTo(childIDs, parentID) {
    var i;
    var parentIndex;
    var childIndex;
    var previousParentID;

    if (!Array.isArray(childIDs)) {
        childIDs = [childIDs];
    }
    parentIndex = mItemsGetIndexOfID(parentID);
    for (i = 0; i < childIDs.length; i++) {
        childIndex = mItemsGetIndexOfID(childIDs[i]);
        
        // if targetparent isn't already child's parent (so the following only triggers upon change)
        if (mItems.database[childIndex].structure.parent !== parentID) {
            
            // if the target parent is not a child of the childID
            if (!mItems.database[childIndex].structure.children.includes(parentID)) {
                previousParentID = mItems.database[childIndex].structure.parent;

                // if the child's previous parent is another item
                if (previousParentID !== undefined) {
                    // clear child from previous parent's children
                    cStructureRemoveChildIDsFrom(childIDs[i], previousParentID);
                    cStructureUpdateDepth(childIDs[i]);
                    cResizeShrink(childIDs[i]);
                    previousParentID = undefined;
                }

                // set parent
                mItems.database[childIndex].structure.parent = parentID;
                console.log('ID: ' + childIDs[i] + `'s parent is now `  + parentID);

                // if targetparent is another item
                if (parentID !== undefined) {
                    // set children
                    mItems.database[parentIndex].structure.children.push(childIDs[i]);
                    cStructureUpdateDepth(childIDs[i]);
                    cResizeShrink(childIDs[i]);
                    cStructureGetDescendantsOfID(parentID);

                    // set grab state
                    cGrab.state = 'hovering over new parent'
                
                // if target is canvas
                } else {
                    cStructureUpdateDepth(childIDs[i]);
                    cResizeShrink(childIDs[i]);
                }
            } else {
                console.log(`A child cannot be it's own parent!`)
            }
        }     
    }
}

function cStructureRemoveChildIDsFrom(childIDs, parentID) {
    var i;
    var childIndex;
    var childIndexInParentID;
    var parentIndex = mItemsGetIndexOfID(parentID);

    if (!Array.isArray(childIDs)) {
        childIDs = [childIDs];
    }

    for (i = 0; i < childIDs.length; i++) {
        childIndex = mItemsGetIndexOfID(childIDs[i]);
        childIndexInParentID = mItems.database[parentIndex].structure.children.indexOf(childIDs[i]);
        mItems.database[parentIndex].structure.children.splice(childIndexInParentID, 1);
        console.log('ID: ' + childIDs[i] + ' is no longer a child of ' + parentID);
    }
}

function cStructureGetDescendantsOfID(itemID) {
    var i = 0;
    var descendantsArray = [itemID];
    var currentIndex;
    while (i < descendantsArray.length) {
        currentIndex = mItemsGetIndexOfID(descendantsArray[i]);
        if (mItems.database[currentIndex].structure.children.length > 0) {
            descendantsArray = descendantsArray.concat(mItems.database[currentIndex].structure.children);
        }
        i += 1
    }
    return descendantsArray;
}

function cStructureGetAncestorsOfID(itemID) {
    var i = 0;
    var ancestorsArray = [itemID];
    var currentIndex;
    while (i < ancestorsArray.length) {
        currentIndex = mItemsGetIndexOfID(ancestorsArray[i]);
        if (mItems.database[currentIndex].structure.parent !== undefined) {
            ancestorsArray = ancestorsArray.concat(mItems.database[currentIndex].structure.parent);
        }
        i += 1
    }
    return ancestorsArray;
}

function cStructureUpdateDepth(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID);
    mItems.database[itemIndex].structure.depth = cStructureGetAncestorsOfID(itemID).length - 1;
}