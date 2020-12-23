interface StandardResponseDTO<T> {
    code: string;
    message?: string;
    detail: T;
}
interface ReponseStatus {
    $pending?: boolean;
    $success?: boolean;
    $error?: boolean;
}