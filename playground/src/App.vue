<script setup lang="ts">
import { ref, computed} from "vue";
import { Codemirror } from 'vue-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { calculateReadabilityOfText } from '../../src/readability.ts';

const codeMirrorExtensions = [markdown(), oneDark]
const input = ref('');
const scores = computed(() => {
  return calculateReadabilityOfText(input.value);
});
</script>

<template>
  <div class="root">
    <div class="editor">
      <codemirror
        v-model="input"
        placeholder="Code goes here..."
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="codeMirrorExtensions"
      />
    </div>
    <div class="scores">
      {{ scores }}
    </div>
  </div>
</template>

<style>
.root {
  display: flex;
  flex-grow: 1;
  padding: 100px;
}

.editor {
  flex-grow: 1;
  margin-right: 20px;
}

.scores {
  width: 400px;
}
</style>