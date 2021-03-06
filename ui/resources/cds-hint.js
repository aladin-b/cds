/**
 * Hint addon for codemirror
 */

(function (mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"), require("../../mode/css/css"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror", "../../mode/css/css"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {
    "use strict";

    CodeMirror.registerHelper("hint", "cds", function (cm, options) {
        // Suggest list
        var cdsCompletionList = options.cdsCompletionList;

        // Get cursor position
        var cur = cm.getCursor(0);

        // Get current line
        var line = cm.doc.children[0].lines[cur.line]
        var text = '';

        if (!line) {
            return null;
        }
        text = line.text;

        // Show nothing if there is no  {{. on the line
        if (text.indexOf('{{.') === -1) {
            return null;
        }

        var areaBefore = text.substring(0, cur.ch);
        if (areaBefore.lastIndexOf('{{.') < areaBefore.lastIndexOf('}}')) {
            return null
        }

        // If the previous value was already completed
        if (text.lastIndexOf('}}') !== -1 && text.lastIndexOf('}}') >= cur.ch) {
            cdsCompletionList = cdsCompletionList.map(function (suggest) {
                return suggest.replace('}}', '');
            });
        }

        return {
            list: cdsCompletionList.filter(function (l) {
                return l.indexOf(areaBefore.substring(areaBefore.lastIndexOf('{{.'))) !== -1;
            }),
            from: {
                line: cur.line,
                ch: areaBefore.lastIndexOf('{{.')
            },
            to: CodeMirror.Pos(cur.line, cur.ch)
        };
    });

    CodeMirror.registerHelper("hint", "condition", function (cm, options) {
        var cdsPrefix = 'cds_';
        var workflowPrefix = 'workflow_';
        var gitPrefix = 'git_';
        // Suggest list
        var cdsCompletionList = options.cdsCompletionList;

        // Get cursor position
        var cur = cm.getCursor(0);
        // Get current line
        var text = cm.doc.children[0].lines[cur.line].text;
        if (text.indexOf(cdsPrefix) === -1 && text.indexOf(workflowPrefix) === -1 && text.indexOf(gitPrefix) === -1) {
            return null;
        }

        var areaBefore = text.substring(0, cur.ch);
        var cdsPrefixCh = areaBefore.lastIndexOf(cdsPrefix);
        var workflowPrefixCh = areaBefore.lastIndexOf(workflowPrefix);
        var gitPrefixCh = areaBefore.lastIndexOf(gitPrefix);

        var ch = Math.max(cdsPrefixCh, workflowPrefixCh, gitPrefixCh);
        return {
            list: cdsCompletionList.filter(function (l) {
                return l.indexOf(areaBefore.substring(areaBefore.lastIndexOf(cdsPrefix))) !== -1 ||
                    l.indexOf(areaBefore.substring(areaBefore.lastIndexOf(workflowPrefix))) !== -1 ||
                    l.indexOf(areaBefore.substring(areaBefore.lastIndexOf(gitPrefix))) !== -1;
            }),
            from: {
                line: cur.line,
                ch: ch
            },
            to: CodeMirror.Pos(cur.line, cur.ch)
        };
    });

    CodeMirror.registerHelper("hint", "payload", function (cm, options) {
        var branchPrefix = '"git.branch":';
        var tagPrefix = '"git.tag":';
        var repoPrefix = '"git.repository":';
        // Suggest list
        var payloadCompletionList = [];

        // Get cursor position
        var cur = cm.getCursor(0);
        var from = 0;

        // Get current line
        var text = cm.doc.children[0].lines[cur.line].text;
        var prefix = "";

        if (!options.payloadCompletionList) {
            return null;
        }

        switch (true) {
            case text.indexOf(branchPrefix) !== -1:
                payloadCompletionList = options.payloadCompletionList.branches;
                prefix = branchPrefix;
                break;
            case text.indexOf(repoPrefix) !== -1:
                payloadCompletionList = options.payloadCompletionList.repositories;
                prefix = repoPrefix;
                break;
            case text.indexOf(tagPrefix) !== -1:
                payloadCompletionList = options.payloadCompletionList.tags;
                prefix = tagPrefix;
                break;
            default:
                return null;
        }

        var lastIndexOfPrefix = text.lastIndexOf(prefix);
        var areaAfterPrefix = text.substring(lastIndexOfPrefix + prefix.length + 1);
        var lastIndexOfComma = areaAfterPrefix.indexOf(',');
        var indexOfComma = text.indexOf(',');
        if (indexOfComma !== -1 && cur.ch >= indexOfComma) {
            return null;
        }

        var areaBefore = text.substring(0, cur.ch);

        if (lastIndexOfComma === -1) {
            lastIndexOfComma += text.length + 1;
        } else if (lastIndexOfComma === 0) {
            lastIndexOfComma += (lastIndexOfPrefix + prefix.length);
        } else {
            lastIndexOfComma += (lastIndexOfPrefix + prefix.length + 1);
        }
        var inc = 0;

        if (text.indexOf(prefix + ' ') !== -1) {
            inc = 1;
        }

        return {
            list: payloadCompletionList,
            from: {
                line: cur.line,
                ch: lastIndexOfPrefix + prefix.length + inc
            },
            to: CodeMirror.Pos(cur.line, lastIndexOfComma)
        };
    });
});
