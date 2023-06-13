declare module 'text-readability' {
    function colemanLiauIndex(input: string): number;
    function fleschReadingEase(input: string): number;
    function gunningFog(input: string): number;
    function smogIndex(input: string): number;
    function automatedReadabilityIndex(input: string): number;
    function linsearWriteFormula(input: string): number;
    function daleChallReadabilityScore(input: string): number;
}
