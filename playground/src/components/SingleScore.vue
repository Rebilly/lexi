<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps<{
    name: string;
    description: string;
    min: number;
    max: number;
    value: number;
}>();

const progress = computed(() => {
    const range = props.max - props.min;
    return ((props.value - props.min) / range) * 100;
});
</script>

<template>
    <div>
        <div class="name-row">
            <span
                >{{ name
                }}<r-icon
                    v-tooltip="{text: description}"
                    icon="info"
                    color="on-surface"
            /></span>
            <span>{{ value.toFixed(2) }}</span>
        </div>
        <div class="bar-container">
            <span>{{ min }}</span>
            <div class="progress-bar">
                <div
                    class="progress-bar-value"
                    :style="{width: `${progress}%`}"
                ></div>
            </div>
            <span>{{ max }}</span>
        </div>
    </div>
</template>

<style scoped>
.name-row {
    display: flex;
    justify-content: space-between;
}

.bar-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.bar-container > * {
    margin: 0 0px;
}

.bar-container span {
    width: 50px;
    text-align: center;
    font-size: 0.8em;
}

.progress-bar {
    width: 100%;
    height: 15px;
    border: 1px solid #e0e0de;
    border-radius: 10px;
    overflow: hidden;
}
.progress-bar-value {
    height: 100%;
    background-color: rgb(0, 68, 212);
    border-radius: 10px;
}

.r-icon {
    margin-left: 6px;
    margin-top: 3px;
    width: 16px;
    fill: rgba(255, 255, 255, 0.60);
}
</style>
