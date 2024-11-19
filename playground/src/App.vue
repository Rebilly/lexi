<script setup lang="ts">
import {ref, computed} from 'vue';
import {
    preprocessMarkdown,
    calculateReadabilityOfText,
    METRIC_RANGES,
} from '../../src/readability.ts';
import SingleScore from './components/SingleScore.vue';
import {metricToDescription} from './metric-descriptions';
import {defaultText} from './default-text';
import GitHubLogoImg from './github-logo.png';

const input = ref(defaultText);
const processedText = computed(() => {
    return preprocessMarkdown(input.value);
});

const previewProcessedText = ref(false);
const wordWrap = ref(true);

// See: https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html
const monaco_options = computed(() => ({
    wordWrap: wordWrap.value,
    scrollBeyondLastLine: false,
}));
const monaco_options_processed_text = computed(() => ({
    ...monaco_options.value,
    readOnly: true,
}));

const rawScores = computed(() => calculateReadabilityOfText(input.value));

const scores = computed(() => {
    return Object.entries(rawScores.value)
        .filter(([name]) => name !== 'readabilityScore')
        .map(([name, value]) => {
            const {min, max} =
                METRIC_RANGES[name as keyof typeof METRIC_RANGES];
            return {
                // convert from namesLikeThis to Names Like This
                name: name
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase()),
                min,
                max,
                value,
                description:
                    metricToDescription[
                        name as keyof typeof metricToDescription
                    ],
            };
        });
});

const readabilityScore = computed(() =>
    rawScores.value.readabilityScore.toFixed(2),
);
</script>

<template>
    <div class="container">
        <div class="info-column">
            <div class="scores">
                <div class="readability-score">
                    <h3>Readability score</h3>
                    <span>{{ readabilityScore }}</span>
                </div>
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
            <div class="options-group">
                <div class="options">
                    <r-toggle
                        label="Preview processed text"
                        v-model="previewProcessedText"
                    />
                    <r-toggle label="Word wrap" v-model="wordWrap" />
                </div>
                <a href="https://github.com/Rebilly/lexi" class="github-link">
                    <img :src="GitHubLogoImg" />
                </a>
            </div>
        </div>
        <div class="editor-column">
            <vue-monaco-editor
                v-if="previewProcessedText"
                v-model:value="processedText"
                :options="monaco_options_processed_text"
                theme="vs-dark"
            />
            <vue-monaco-editor
                v-else
                v-model:value="input"
                :options="monaco_options"
                theme="vs-dark"
                language="markdown"
            />
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
}

.info-column {
    width: 25%;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.options-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.options > *:not(:last-child) {
    margin-bottom: 16px;
}

.editor-column {
    flex-grow: 1;
}

.scores > * {
    margin-bottom: 16px;
    font-weight: 300;
}

.readability-score {
    text-align: center;
    margin-bottom: 32px;
    font-weight: 100;

    > h3 {
        margin-bottom: 0;
    }

    > span {
        font-size: 2rem;
    }
}

.github-link {
    > img {
        width: 36px;
    }
}
</style>
