import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing...'
    }), [placeholder]);

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={newContent => {}} // eslint-disable-line no-unused-vars
        />
    );
};

export default Editor;
