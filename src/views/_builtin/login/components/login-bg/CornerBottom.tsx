import { defineComponent } from 'vue'

export default defineComponent({
	name: 'CornerBottom',
	props: {
		startColor: {
			type: String,
			default: '#28aff0'
		},
		endColor: {
			type: String,
			default: '#120fc4'
		}
	},
	setup(props) {
		return () => (
			<svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='896' width='967.8852157128662'>
				<defs>
					<path
						id='path-2'
						opacity='1'
						fill-rule='evenodd'
						d='M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896 C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806 200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z'
					/>
					<linearGradient id='linearGradient-3' x1='0.5' y1='0' x2='0.5' y2='1'>
						<stop offset='0' stop-color={props.startColor} stop-opacity='1' />
						<stop offset='1' stop-color={props.endColor} stop-opacity='1' />
					</linearGradient>
				</defs>
				<g opacity='1'>
					<use xlinkHref='#path-2' fill='url(#linearGradient-3)' fill-opacity='1' />
				</g>
			</svg>
		)
	}
})
