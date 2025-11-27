export default class GroupSearchSource {
    search(query: any): Promise<import("flarum/common/Store").ApiResponsePlural<import("flarum/common/Model").default>>;
    view(query: any): "" | (JSX.Element | JSX.Element[])[];
}
