import { useField } from 'formik';

interface SelectData<DataValueType> {
    label: string;
    value: DataValueType | null;
}
export interface StyledSelectProps<DataValueType> {
    name: string;
    data: Array<SelectData<DataValueType>>;
    onSelect?: (value: DataValueType | null) => void
}

const StyledSelect = <DataValueType extends any>({ name, data = [], onSelect = () => { } }: StyledSelectProps<DataValueType>) => {
    const [, meta, helpers] = useField({ name });
    const { value } = meta;
    const { setValue } = helpers;
    const onItemSelect = (item: SelectData<DataValueType>) => {
        setValue(item.value);
        onSelect(item.value);
    }
    const getClassName = (item: SelectData<DataValueType>) => {
        return item.value === value ? "selected" : ""
    }
    return (
        <div>
            <ul>
                <li className={getClassName({ label: '', value: null })} onClick={() => onItemSelect({ label: '', value: null })}>선택하세요</li>
                {data.map((item, index) => <li className={getClassName(item)} onClick={() => onItemSelect(item)} key={index} data-val={item.value}>{item.label}</li>)}
            </ul>
        </div>
    )
};
export default StyledSelect;