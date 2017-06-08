
//Single state object
var state = {
  items: [{
    name: 'apples',
    checked: false,
  },
  {
    name: 'oranges',
    checked: false,
  },
  {
    name: 'milk',
    checked: true,
  },
  {
    name: 'bread',
    checked: false,
  }]
};

//State modification functions
function addItem(state, item) {
  state.items.push({
    name: item,
    checked: false,
  });
};

function checkItem(state, item) {
  var index = item.data("itemindex");
  state.items[index].checked = !state.items[index].checked;
  renderList(state, $('.js-shopping-list'));
}

function deleteItem(state, item) {
   var index = item.data("itemindex");
   state.items.splice(index,1);
   renderList(state, $('.js-shopping-list'));
}

//Render functions
function renderList(state, element) {
  var itemsHTML = state.items.map(function(item,i) {
    return (`
      <li data-itemindex="${i}">
        <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : null}">${item.name}</span>
        <div class="shopping-item-controls">
          <button type="button" class="js-shopping-item-toggle"><span class="button-label">check</span></button>
          <button type="button" class="js-shopping-item-delete"><span class="button-label">delete</span></button>
        </div>
      </li>
      `)
  });
  element.html(itemsHTML);
};

//Event listeners
function handlesItemAdds () {
  $('#js-shopping-list-form').on('submit', function(e) {
    e.preventDefault();
    addItem(state, $('.js-shopping-list-entry').val());
    renderList(state, $('.js-shopping-list'));
  });
}

function handlesItemToggles() {
  $('.js-shopping-list').on('click', '.js-shopping-item-toggle', function(e) {
    var target = $(this).closest('li');
    checkItem(state, target);
  });
}

function handlesItemDeletes() {
  $('.js-shopping-list').on('click', '.js-shopping-item-delete', function(e) {
     var targetDelete = $(this).closest('li');
     deleteItem(state, targetDelete);
  });
}


//Document ready
$(function() {
  handlesItemAdds();
  handlesItemToggles();
  handlesItemDeletes();
});