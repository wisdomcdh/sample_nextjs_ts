import { RootState } from "@Services/redux/rootReducer";
import { useSelector } from "react-redux";

export default function useTypeSelector<TState = RootState, TSelected = unknown>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
    return useSelector<TState, TSelected>(selector, equalityFn);
}