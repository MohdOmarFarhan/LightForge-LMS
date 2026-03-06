<script setup>
import { ref, watch, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Make katex available globally for Quill
window.katex = katex;

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: 'Enter text...',
    },
});

const emit = defineEmits(['update:modelValue']);

const content = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
    if (newVal !== content.value) {
        content.value = newVal;
    }
});

const onUpdateContent = () => {
    emit('update:modelValue', content.value);
};

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting
    ['link', 'image', 'video', 'formula']              // link and image, video, formula
];

const modules = {
    toolbar: toolbarOptions
};
</script>

<template>
    <div class="rich-text-editor">
        <QuillEditor
            v-model:content="content"
            contentType="html"
            theme="snow"
            :toolbar="toolbarOptions"
            :placeholder="placeholder"
            @update:content="onUpdateContent"
            class="bg-[#0D1117] text-white border-gray-700 rounded-lg"
        />
    </div>
</template>

<style>
/* Custom Dark Theme Overrides for Quill */
.ql-toolbar.ql-snow {
    border-color: #374151 !important;
    background-color: #1F2937;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

.ql-container.ql-snow {
    border-color: #374151 !important;
    background-color: #0D1117;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    font-family: 'Onest', sans-serif;
    font-size: 1rem;
}

.ql-editor {
    min-height: 150px;
    color: #e5e7eb; /* Gray-200 */
}

.ql-editor.ql-blank::before {
    color: #6b7280 !important; /* Gray-500 placeholder */
    font-style: normal;
}

/* Toolbar Icons Color */
.ql-snow .ql-stroke {
    stroke: #9CA3AF !important;
}
.ql-snow .ql-fill {
    fill: #9CA3AF !important;
}
.ql-snow .ql-picker {
    color: #9CA3AF !important;
}

/* Active State */
.ql-snow .ql-active .ql-stroke {
    stroke: #0D6EFD !important;
}
.ql-snow .ql-active .ql-fill {
    fill: #0D6EFD !important;
}

/* Dropdowns */
.ql-snow .ql-picker-options {
    background-color: #1F2937 !important;
    border-color: #374151 !important;
    color: #e5e7eb !important;
}
</style>
