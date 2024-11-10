import { CardProps } from '@/types/componentProps';
import Image from 'next/image';

const Card: React.FC<CardProps> = (props) => {
	const { bookItems, handleImageError } = props;

	return (
		<>
			{bookItems.map((item) => (
				<div
					key={item.key}
					className='flex flex-col min-h-96 bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/1 lg:w-1/1 md:w-1/1 sm:w-1/1'
				>
					<div className='flex flex-5'>
						{item.cover_i ? (
							<Image
								src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
								alt={item.title}
								width={200}
								height={200}
								onError={handleImageError}
								loading='lazy'
								className='flex flex-5 flex-col w-full object-cover h-96'
							/>
						) : (
							<div className='flex w-full h-96 bg-slate-300 text-xl text-slate-600 text-center items-center justify-center font-semibold'>
								Cover Image Unavailable
							</div>
						)}
					</div>
					<div className='flex flex-1 p-6 flex-col'>
						<div className='flex flex-col items-baseline flex-wrap break-words'>
							<div className='text-gray-600 text-xs uppercase font-semibold tracking-wide'>
								<div>Publishing Year: {item.first_publish_year}</div>
							</div>
						</div>
						<h4 className='mt-6 font-semibold text-xl leading-tight flex-wrap break-words'>{item.title}</h4>
						<div className='mt-2 mb-6 text-sm'>
							{Array.isArray(item.author_name)
								? item.author_name.map((author: string) => {
										return <div key={`${item.key}-${Math.random()}`}>{author}</div>;
								  })
								: item.author_name}
						</div>
						<div className='mt-auto text-gray-600 text-xs uppercase font-semibold tracking-wide'>
							<div>Edition: {item.edition_count}</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Card;
