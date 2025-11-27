export default class UserSearchSource {
    view(query: any): any[] | undefined;
    query: any;
    loading: boolean | undefined;
    pushResults(results: any): void;
}
