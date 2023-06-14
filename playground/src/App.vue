<script setup lang="ts">
import {ref, computed} from 'vue';
import {Codemirror} from 'vue-codemirror';
import {markdown} from '@codemirror/lang-markdown';
import {oneDark} from '@codemirror/theme-one-dark';
import {calculateReadabilityOfText} from '../../src/readability.ts';

const codeMirrorExtensions = [markdown(), oneDark];
const input = ref('');
const scores = computed(() => {
    return calculateReadabilityOfText(input.value);
});
</script>

<template>
    <div class="row">
        <div class="column">
            <h1>Readability Playground</h1>
        </div>
    </div>
    <div class="row">
        <div class="column editor size-70">
            <codemirror
                v-model="input"
                placeholder="Code goes here..."
                :style="{height: '400px'}"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="codeMirrorExtensions"
            />
        </div>
        <div class="column size-30">
            <div class="scores">
                {{ scores }}
            </div>
        </div>
    </div>
</template>

<style>
.row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}
.column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    padding: 25px;
}
.size-70 {
    flex-basis: 60%;
}
.size-30 {
    flex-basis: 25%;
}
.editor {
  max-width: 60%;
}
</style>
