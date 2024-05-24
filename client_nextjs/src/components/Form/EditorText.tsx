import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export interface EditorTextProps {
	onEditorChange: (content: string) => void;
	initialValue?: string;
}

const EditorText: FC<EditorTextProps> = ({ onEditorChange, initialValue }) => {
	return (
		<Editor
			apiKey="yzz1chogxlfmvur9dccog16q7rw63ajhx4po8tcxi6fbzhpg"
			initialValue={initialValue}
			init={{
				height: 500,
				menubar: true,
				plugins: [
					"advlist autolink lists link image charmap print preview anchor",
					"searchreplace visualblocks code fullscreen",
					"insertdatetime media table paste code help wordcount",
				],
				toolbar:
					"undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
			}}
			onEditorChange={onEditorChange}
		/>
	);
};

export default EditorText;
