<script setup lang="ts">
import {ref, computed} from 'vue';
import {Codemirror} from 'vue-codemirror';
import {markdown} from '@codemirror/lang-markdown';
import {oneDark} from '@codemirror/theme-one-dark';
import {
    preprocessMarkdown,
    calculateReadabilityOfText,
    METRIC_RANGES,
} from '../../src/readability.ts';
import SingleScore from './components/SingleScore.vue';
import {metricToDescription} from './metric-descriptions';

const codeMirrorExtensions = [markdown(), oneDark];

const input = ref('');
const previewProcessedText = ref(false);
const processedText = computed(() => {
    return preprocessMarkdown(input.value);
});


const scores = computed(() => {
    const rawScores = calculateReadabilityOfText(input.value);
    return Object.entries(rawScores).map(([name, value]) => {
        const {min, max} = METRIC_RANGES[name as keyof typeof METRIC_RANGES];
        return {
            // convert from namesLikeThis to Names Like This
            name: name
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase()),
            min,
            max,
            value,
            description:
                metricToDescription[name as keyof typeof metricToDescription],
        };
    });
});
</script>

<template>
    <div class="row">
        <div class="column">
            <h1>Lexi playground</h1>
        </div>
    </div>
    <div class="row">
        <div class="column editor size-70">
            <r-toggle
                label="Preview processed text"
                v-model="previewProcessedText"
            />
            <codemirror
                v-if="previewProcessedText"
                v-model="processedText"
                :disabled="true"
                :style="{height: '400px'}"
                :autofocus="true"
                :extensions="codeMirrorExtensions"
            />
            <codemirror
                v-else
                v-model="input"
                :style="{height: '400px'}"
                :autofocus="true"
                placeholder="Enter markdown to score here."
                :extensions="codeMirrorExtensions"
            />
        </div>
        <div class="column size-30 auto-margin">
            <div class="scores">
                <SingleScore
                    v-for="score in scores"
                    :key="score.name"
                    :name="score.name"
                    :min="score.min"
                    :max="score.max"
                    :value="score.value"
                    :description="score.description"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.editor {
    max-width: 60%;
}

.editor > *:not(:last-child) {
    margin-bottom: 16px;
}

.auto-margin {
    margin-left: auto;
    margin-right: auto;
}

.scores > * {
    margin-bottom: 16px;
}
</style>
