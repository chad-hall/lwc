/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import * as parse5 from 'parse5';
import * as he from 'he';

import { ParserDiagnostics } from '@lwc/errors';

import ParserCtx from './parser';
import { sourceLocation } from '../shared/ast';
import { errorCodesToErrorOn, errorCodesToWarnOn } from './parse5Errors';

function getLwcErrorFromParse5Error(code: string) {
    if (errorCodesToErrorOn.has(code)) {
        return ParserDiagnostics.INVALID_HTML_SYNTAX;
    }
    if (errorCodesToWarnOn.has(code)) {
        return ParserDiagnostics.INVALID_HTML_SYNTAX_WARNING;
    }
    // It should be impossible to reach here; we have a test in parser.spec.ts to ensure
    // all error codes are accounted for. But just to be safe, make it a warning.
    // TODO [#2650]: better system for handling unexpected parse5 errors
    // eslint-disable-next-line no-console
    console.warn('Found a Parse5 error that we do not know how to handle:', code);
    return ParserDiagnostics.INVALID_HTML_SYNTAX_WARNING;
}

export function parseHTML(ctx: ParserCtx, source: string) {
    const onParseError = (err: parse5.ParsingError) => {
        const { code, ...location } = err;

        const lwcError = getLwcErrorFromParse5Error(code);
        ctx.warnAtLocation(lwcError, sourceLocation(location), [code]);
    };

    return parse5.parseFragment(source, {
        sourceCodeLocationInfo: true,
        onParseError,
    });
}

// https://github.com/babel/babel/blob/d33d02359474296402b1577ef53f20d94e9085c4/packages/babel-types/src/react.js#L9-L55
export function cleanTextNode(value: string): string {
    const lines = value.split(/\r\n|\n|\r/);
    let lastNonEmptyLine = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/[^ \t]/)) {
            lastNonEmptyLine = i;
        }
    }

    let str = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isFirstLine = i === 0;
        const isLastLine = i === lines.length - 1;
        const isLastNonEmptyLine = i === lastNonEmptyLine;

        let trimmedLine = line.replace(/\t/g, ' ');

        if (!isFirstLine) {
            trimmedLine = trimmedLine.replace(/^[ ]+/, '');
        }

        if (!isLastLine) {
            trimmedLine = trimmedLine.replace(/[ ]+$/, '');
        }

        if (trimmedLine) {
            if (!isLastNonEmptyLine) {
                trimmedLine += ' ';
            }

            str += trimmedLine;
        }
    }

    return str;
}

export function decodeTextContent(source: string): string {
    return he.decode(source);
}
