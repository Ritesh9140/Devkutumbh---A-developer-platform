# 🚀 DevKutumbh Collaborative IDE Guide

## Full Project IDE Features

DevKutumbh now includes a **complete collaborative IDE** that allows both users in a video call to work on real projects together!

---

## 🎯 Key Features

### 1. **File & Folder Upload**
- Upload entire project folders from your local computer
- Both users see the same file structure
- Supports all file types (JS, Python, C++, HTML, CSS, etc.)

### 2. **File Explorer**
- Visual tree structure of your project
- Expandable/collapsible folders
- Click to open and edit files
- Both users navigate the same project

### 3. **Monaco Code Editor**
- Full VS Code editor experience
- Syntax highlighting for all languages
- Line numbers, minimap, autocomplete
- **Real-time collaborative editing**
- Changes sync instantly to both users

### 4. **Code Execution**
- **JavaScript/Node.js**: Runs directly in browser
- **HTML**: Opens in new browser tab
- **Python/C++/Java**: Requires backend integration (Judge0)
- Output shown to both users

### 5. **Download Files**
- Download any file from the project
- Both users can download independently
- Preserves original filename

### 6. **Git Clone** (Simulated)
- Enter Git repository URL
- Note: Full Git clone requires backend implementation
- Alternative: Download repo locally and upload folder

---

## 📂 How to Use

### Upload a Project

1. Click the **"Upload"** button in IDE header
2. Select a folder from your computer (browser will ask for permission)
3. All files and folders upload automatically
4. Other user sees the files instantly!

### Work on Files

1. Click any file in the file explorer
2. Start editing in the Monaco editor
3. Changes sync in real-time to other user
4. Both see the same cursor position (coming soon!)

### Run Code

1. Select a file to run
2. Click the **"Run"** button
3. Output appears in the Output panel
4. Other user sees the same output

### Download Files

1. Open the file you want
2. Click the **"Download"** button
3. File downloads to your computer

---

## 🔧 Technical Details

### Supported Languages

**Full Support (Browser Execution)**:
- JavaScript (.js, .jsx)
- HTML (.html)
- CSS (.css)

**Syntax Highlighting Only** (Needs Judge0 for execution):
- Python (.py)
- C++ (.cpp, .c)
- Java (.java)
- Go (.go)
- Rust (.rs)
- PHP (.php)
- Ruby (.rb)
- C# (.cs)
- Swift (.swift)
- Kotlin (.kt)

### Real-Time Synchronization

All IDE features sync via Socket.IO:
- `ide-files-update`: Syncs entire file tree
- `ide-file-content`: Syncs individual file edits
- `ide-output`: Shares execution output

### File Upload Technical Details

- Uses HTML5 File API
- Supports `webkitdirectory` for folder selection
- Builds tree structure automatically
- Preserves folder hierarchy

---

## 🎨 UI Features

### File Explorer
- 📁 Yellow folder icons
- 📄 Blue file icons
- Expand/collapse with arrow icons
- Highlighted active file

### Editor Panel
- Full-screen Monaco editor
- Dark theme (vs-dark)
- Minimap on right side
- Current filename in header

### Output Panel
- Terminal-style monospace font
- Scrollable output
- Shows execution results
- Error messages in red

---

## 🚀 Advanced Usage

### For JavaScript Developers

```javascript
// Example: Upload a React project folder
// File: src/App.jsx
function App() {
  return <h1>Hello DevKutumbh!</h1>;
}
```

Both users can:
- Edit components
- See changes instantly
- Run individual files
- Debug together

### For Python Developers

```python
# Example: Upload Python scripts
# File: main.py
def hello(name):
    print(f"Hello, {name}!")

hello("DevKutumbh")
```

Note: Python execution needs Judge0 API backend

### For C++ Developers

```cpp
// Example: Upload C++ project
// File: main.cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello DevKutumbh!" << endl;
    return 0;
}
```

Note: C++ compilation needs Judge0 API backend

---

## 🔮 Coming Soon

### Enhanced Features
- ✅ Git clone integration (backend)
- ✅ Live cursor indicators
- ✅ User name badges on edits
- ✅ Code formatting (Prettier)
- ✅ Multiple file tabs
- ✅ Search & Replace
- ✅ File creation/deletion
- ✅ Syntax error highlighting
- ✅ Integrated debugger

### Execution Support
- ✅ Judge0 API integration
- ✅ Full Python support
- ✅ C++ compilation
- ✅ Java/Go/Rust execution
- ✅ npm/pip package installation
- ✅ Real terminal commands

---

## 🛠️ Setup for Full Execution

### Option 1: Judge0 API (Cloud)

1. Visit https://judge0.com/
2. Sign up for API key
3. Add to backend `.env`:
   ```
   JUDGE0_API_KEY=your_key_here
   JUDGE0_API_URL=https://api.judge0.com
   ```
4. Backend will handle execution requests

### Option 2: Local Judge0 (Self-hosted)

1. Install Docker
2. Run Judge0 container:
   ```bash
   docker run -p 2358:2358 -d judge0/judge0
   ```
3. Update backend to use `localhost:2358`

### Option 3: Custom Backend

Create backend endpoint `/api/execute`:
```javascript
// backend/src/routes/execute.route.js
router.post("/execute", async (req, res) => {
  const { code, language } = req.body;
  
  // Execute code based on language
  // Return output
});
```

---

## 📊 Use Cases

### 1. **Coding Interviews**
- Share screen and code together
- Run test cases live
- Debug in real-time

### 2. **Pair Programming**
- Work on same project simultaneously
- See each other's changes instantly
- Navigate files together

### 3. **Code Reviews**
- Open PR files
- Discuss and edit together
- Test changes live

### 4. **Teaching/Mentoring**
- Upload teaching materials
- Guide students through code
- Run examples together

### 5. **Hackathons**
- Collaborate on projects
- Share code files
- Test features together

---

## 🎯 Tips & Best Practices

### File Organization
✅ Upload well-structured projects
✅ Use clear folder names
✅ Keep files organized by type

### Collaboration
✅ Communicate before major edits
✅ Use video call to discuss changes
✅ Download files as backup

### Performance
✅ Upload smaller projects (<100MB)
✅ Avoid huge binary files
✅ Close unused files

### Security
⚠️ Don't upload sensitive credentials
⚠️ Avoid committing API keys
⚠️ Use .gitignore patterns

---

## 🐛 Troubleshooting

### Files Not Syncing?
1. Check internet connection
2. Verify both users in same call
3. Refresh browser

### Can't Upload Folder?
1. Use Chrome/Edge (best support)
2. Grant folder access permission
3. Try smaller folder first

### Execution Not Working?
1. JavaScript works out-of-box
2. Other languages need Judge0
3. Check console for errors

### Output Not Showing?
1. Check Output panel (right side)
2. Look for error messages
3. Try running simpler code first

---

## 💡 Feature Comparison

| Feature | Simple Code Editor | Full IDE |
|---------|-------------------|----------|
| Single file editing | ✅ | ✅ |
| Multiple files | ❌ | ✅ |
| Folder structure | ❌ | ✅ |
| File upload | ❌ | ✅ |
| Download files | ❌ | ✅ |
| Project navigation | ❌ | ✅ |
| Git integration | ❌ | 🔄 Coming |
| File explorer | ❌ | ✅ |

---

## 🎉 Get Started!

1. Join a video call on DevKutumbh
2. Click **"Project IDE"** button (green)
3. Upload your project folder
4. Start coding together!

Both users will see the same project and can edit files collaboratively in real-time!

---

**Built with** ❤️ **by DevKutumbh Team**

*Empowering developers to collaborate, code, and create together!*
