# Use On Screen

**use-on-screen** is a React Hooks library used to detect if a certain element is visible on the screen, both in a scrollable container and in the window.

## Installation ⚙️

Use the package manager [npm](https://www.npmjs.com/) to install **use-on-screen**.

```bash
npm install use-on-screen
```

## Usage 🛠️

```javascript
// ...
import useOnScreen from "use-on-screen";

function FakeFeed() {
    const visible = useOnScreen({
        target: "#loader", // default: ""
        parent: "#feed", 
        // if the parent is not defined, 
        // it will consider the entire user's viewport
        delay: 500 // default: 1000
    });
    
    // ...
    
    // Use useEffect() to call a function when element is visible
    useEffect(() => {
        if (visible) loadMorePosts();
    }, [visible]);

    // ...

    return (
        <section id="feed">
            {/*
                Many other posts over here...
            */}
            <span id="loader"></span> {/* if visible, it will 
            load more posts*/}
        </section>
    );
}
```

## Contributing 💭
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License 📝
[MIT](https://choosealicense.com/licenses/mit/)