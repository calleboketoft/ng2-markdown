// Use 3rd party libs to generate HTML from Markdown
"use strict";
var commonmark = require('commonmark');
var hljs = require('highlight.js');
var commonmarkReader = new commonmark.Parser();
var commonmarkWriter = new commonmark.HtmlRenderer();
function generateHtmlFromMarkdown(markdownText) {
    var parsed = commonmarkReader.parse(markdownText);
    var markdownHtml = commonmarkWriter.render(parsed);
    var div = document.createElement('div');
    div.className = 'markdown-body';
    div.innerHTML = markdownHtml;
    return div;
}
exports.generateHtmlFromMarkdown = generateHtmlFromMarkdown;
function applyHighlightingToHtml(domElement) {
    // pure function, clone the input
    var domElCopy = domElement.cloneNode(true);
    Array.prototype.slice.call(domElCopy.querySelectorAll('pre code'))
        .forEach(function (block) { return hljs.highlightBlock(block); });
    return domElCopy;
}
exports.applyHighlightingToHtml = applyHighlightingToHtml;
function cleanCurlyBraces(htmlText) {
    // Handle curly braces within text (Angular 2 doesn't like)
    var htmlTextFixed = htmlText.replace(/{/g, '&#123;');
    htmlTextFixed = htmlTextFixed.replace(/}/g, '&#125;');
    return htmlTextFixed;
}
exports.cleanCurlyBraces = cleanCurlyBraces;
function getCleanHtmlTextFromMarkdown(mdText) {
    var mdHtmlEl = generateHtmlFromMarkdown(mdText);
    var mdHtmlElHighlight = applyHighlightingToHtml(mdHtmlEl);
    return cleanCurlyBraces(mdHtmlElHighlight.outerHTML);
}
exports.getCleanHtmlTextFromMarkdown = getCleanHtmlTextFromMarkdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0RBQW9EOztBQUVwRCxJQUFZLFVBQVUsV0FBTSxZQUM1QixDQUFDLENBRHVDO0FBQ3hDLElBQVksSUFBSSxXQUFNLGNBRXRCLENBQUMsQ0FGbUM7QUFTcEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUM5QyxJQUFJLGdCQUFnQixHQUFHLElBQUksVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFBO0FBRXBELGtDQUFtQyxZQUFvQjtJQUNyRCxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDakQsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRWxELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUE7SUFDL0IsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUE7SUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQTtBQUNaLENBQUM7QUFqQkMsZ0NBQXdCLDRCQWlCekI7QUFFRCxpQ0FBa0MsVUFBdUI7SUFDdkQsaUNBQWlDO0lBQ2pDLElBQUksU0FBUyxHQUFnQixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZELEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0QsT0FBTyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQXhCQywrQkFBdUIsMkJBd0J4QjtBQUVELDBCQUEyQixRQUFRO0lBQ2pDLDJEQUEyRDtJQUMzRCxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNwRCxhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDckQsTUFBTSxDQUFDLGFBQWEsQ0FBQTtBQUN0QixDQUFDO0FBOUJDLHdCQUFnQixvQkE4QmpCO0FBRUQsc0NBQXVDLE1BQU07SUFDM0MsSUFBSSxRQUFRLEdBQUcsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0MsSUFBSSxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDdEQsQ0FBQztBQW5DQyxvQ0FBNEIsZ0NBbUM3QiJ9