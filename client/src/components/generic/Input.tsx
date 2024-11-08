'use client';

import { InputProps } from '@/types/componentProps';

const Input: React.FC<InputProps> = (props) => {
	const { className, type, placeholder, value, onChange, inputClassName, labelClassName, label } = props;

	return (
		<div className={className}>
			<label className={labelClassName}>{label}</label>
			<input className={inputClassName} type={type} placeholder={placeholder} value={value} onChange={onChange} />
		</div>
	);
};

export default Input;
