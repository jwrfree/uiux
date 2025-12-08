import React, { useState } from 'react';

const HoverReceiver = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [buttonColor, setButtonColor] = useState('#0000ff');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'backgroundColor':
        setBackgroundColor(value);
        break;
      case 'textColor':
        setTextColor(value);
        break;
      case 'buttonColor':
        setButtonColor(value);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ backgroundColor, color: textColor, padding: '20px' }}>
      <h2>Customize Your Theme</h2>
      <div>
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          type="color"
          id="backgroundColor"
          name="backgroundColor"
          value={backgroundColor}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label htmlFor="textColor">Text Color:</label>
        <input
          type="color"
          id="textColor"
          name="textColor"
          value={textColor}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label htmlFor="buttonColor">Button Color:</label>
        <input
          type="color"
          id="buttonColor"
          name="buttonColor"
          value={buttonColor}
          onChange={handleColorChange}
        />
      </div>
      <button style={{ backgroundColor: buttonColor, color: textColor, marginTop: '10px' }}>
        Example Button
      </button>

      <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
       <div
        role="button"
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => e.key === 'Enter' && console.log('Clicked')}
        tabIndex={0}
        style={{ marginTop: '20px', cursor: 'pointer' }}
      >
        Clickable Div
      </div>
    </div>
  );
};

export default HoverReceiver;
