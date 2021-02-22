import React from 'react';
import { useEffect } from 'react';
import marked from 'marked';
import './app.css';

const defaultMarkdown = `# Downsview Mark
*A Markdown Previewer built with React*
___

**Write** or paste [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) text on the left to see it \`previewed\` to the right.

___

## Downsview Park

[Downsview Park](https://en.wikipedia.org/wiki/Downsview_Park) is a large urban park located in the Downsview neighborhood of Toronto, Ontario, Canada. The park's name is officially bilingual due to it being federally owned and managed, and was first home to de Havilland Canada, an aircraft manufacturer, and later was a Canadian Forces base.

> This is an example of a quote. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### A code block, a list, and a puppy

\`\`\`python
def greet(name):
    greeting = f"Hello {name}!"
    return greeting

print(greet("Bob"))
\`\`\`

* Excepteur sint occaecat cupidatat non proident
* sunt in culpa qui officia deserunt
* mollit anim id est laborum.

![A cute puppy](https://place-puppy.com/200x200 "A cute puppy")

# The Editor is Sticky!

---

**As in it stays with you as your scroll. How convienient!**

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`

function Preview(props) {
  return (
    <div
      id="preview"
      className="Previewer__section"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, {breaks: true, gfm: true,})
      }}
    >
    </div>
  );
}

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: defaultMarkdown,
      copySuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  copyToClipboard = (event) => {
    console.log(event.target);
    const elem = this.textArea
    elem.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
    setTimeout(() => {
      this.setState({copySuccess: false});
    }, 2000)
  }

  render() {
    return (
      <div id="Previewer">
        <div id="stickyContainer">
          <div id="inputForm" className="Previewer__section">
            <div className="Previewer__header">
              <p class="Previewer__title">💫  Welcome to my markdown previewer</p>
              {
                this.state.copySuccess ?
                <div className="Previewer__success">
                  Copied to Clipboard!
                </div> : null
              }
              <button className="Previewer__button" onClick={(e) => this.copyToClipboard(e)}>Copy</button>
            </div>
            <textarea id="editor" value={this.state.value} onChange={this.handleChange} ref={(textarea) => this.textArea = textarea}/>
            {/* <input type="submit" value="Submit" /> */}
          </div>
        </div>
        <Preview markdown={this.state.value} />
      </div>
    );
  }
}

function App() {

  // Free Code Camp test module
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div id="app">
      <Previewer />
    </div>
  );
}

export default App;
