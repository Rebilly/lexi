import './sourcemap-register.cjs';/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (undefined && undefined.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (undefined && undefined.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const exec = __importStar(require("@actions/exec"));
const github_2 = require("./github");
const readability_files_1 = require("./readability-files");
const report_1 = require("./report");
const markdown_1 = require("./markdown");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!github_1.context.payload.pull_request || !github_1.context.payload.repository) {
            core.setFailed('This action can only be run on pull requests');
            return;
        }
        // action parameters
        const token = core.getInput('github-token');
        const glob = core.getInput('glob');
        const baseBranchSha = github_1.context.payload.pull_request.base.sha;
        const headBranchSha = github_1.context.payload.pull_request.head.sha;
        const prNumber = github_1.context.payload.pull_request.number;
        const client = (0, github_1.getOctokit)(token);
        // Run readability on base branch
        console.log(`Checking out ${baseBranchSha}`);
        yield exec.exec(`git checkout ${baseBranchSha}`);
        const oldReadability = (0, readability_files_1.calculateReadability)(glob);
        // Run readability on head branch
        console.log(`Checking out ${headBranchSha}`);
        yield exec.exec(`git checkout ${headBranchSha}`);
        const newReadability = (0, readability_files_1.calculateReadability)(glob);
        const fileStatuses = yield (0, github_2.getFileStatusesFromPR)(client, github_1.context, prNumber);
        const report = (0, report_1.generateReport)(newReadability, oldReadability, fileStatuses);
        // Only post a comment if there are results from markdown files
        // changed in this PR
        if (report.fileResults.length) {
            const repository = github_1.context.payload.repository.full_name;
            const commit = github_1.context.payload.pull_request.head.sha;
            const body = (0, markdown_1.reportToComment)(report, repository, commit);
            yield (0, github_2.upsertComment)(client, github_1.context, github_1.context.payload.pull_request.number, body, `<!-- ${glob}-code-coverage-assistant -->`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(`Action failed with error: ${error.message}`);
        }
        else {
            core.setFailed(`Action failed.`);
        }
    }
});
main();


//# sourceMappingURL=index.js.map