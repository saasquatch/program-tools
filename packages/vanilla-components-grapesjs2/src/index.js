export default function(editor){

  var comps = editor.DomComponents;

  // Get the model and the view from the default Component type
  var defaultType = comps.getType('default');
  var defaultModel = defaultType.model;

  comps.addType('referral-list', {
    // Define the Model
    model: defaultModel.extend({
        // Extend default properties
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          name: "Referral List Feed",
          // Can be dropped only inside `form` elements
          draggable: '*',
          // Can't drop other elements inside it
          droppable: false,
          // Traits (Settings)
          traits: ['prop1', 'prop2','prop3']
        }),
        getAttrToHTML: function(...args) {
          // const attr = defaultType.prototype.getAttrToHTML.apply(this, args);
          // delete attr.style;
          // return attr;
        },
      },
      // The second argument of .extend are static methods and we'll put inside our
      // isComponent() method. As you're putting a new Component type on top of the stack,
      // not declaring isComponent() might probably break stuff, especially if you extend
      // the default one.
      {
        isComponent: function (el) {
          if (el.tagName === 'REFERRAL-LIST') {
            console.log("Is referral list");
            return { type: 'referral-list' };
          }else{
            console.log("Is NOT referral list");

          }
      },
    }),

    // Define the View
    view: defaultType.view.extend({
      // Bind events
      events: {
        // If you want to bind the event to children elements
        // 'click .someChildrenClass': 'methodName',
        // click: 'handleClick',
        dblclick: function () {
          alert('Hi!');
        }
      },

      // It doesn't make too much sense this method inside the component
      // but it's ok as an example
      randomHex: function () {
        return '#' + Math.floor(Math.random() * 16777216).toString(16);
      },

      handleClick: function (e) {
        // alert("yo!");
        this.model.set('style', { color: this.randomHex() }); // <- Affects the final HTML code
        this.el.style.backgroundColor = this.randomHex(); // <- Doesn't affect the final HTML code
        // Tip: updating the model will reflect the changes to the view, so, in this case,
        // if you put the model change after the DOM one this will override the backgroundColor
        // change made before
      },

      // The render() should return 'this'
      render: function () {
        // Extend the original render method
        console.log("Rendering referral list", this, arguments);
        defaultType.view.prototype.render.apply(this, arguments);
        // this.el = document.createElement("div");
        // this.el.parent.innerHtml = 'Text here'; // <- Doesn't affect the final HTML code
        // this.el.style.backgroundColor="red";
        // this.el.style.height="100px";
        // this.el.style.display = "block";
        // this.el.innerText = "Magic";
        return this;
      },
    }),
  });


  console.log("Registered custom component");
}
