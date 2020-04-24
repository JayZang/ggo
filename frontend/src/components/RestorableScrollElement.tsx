import React, { Component } from 'react'

let positionMemoryStorage: {
    x: number
    y: number
}[] = []

type IProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    elementRef?: React.RefObject<HTMLDivElement> 
    symbol?: Symbol
    onScrollBottom?: () => void
}

export default class RestorableScrollElement extends Component<IProps>{
    elementRef: React.RefObject<HTMLDivElement> 

    constructor(props: IProps) {
        super(props)

        this.elementRef = props.elementRef || React.createRef<HTMLDivElement>()
    }

    handleScroll(event: React.UIEvent<HTMLDivElement>) {
        this.props.onScroll && this.props.onScroll(event)

        const element = this.elementRef.current!
        if (element.scrollTop !== 0 && element.scrollTop + element.clientHeight >= element.scrollHeight)
            this.props.onScrollBottom && this.props.onScrollBottom()

        const symbol = this.props.symbol as any

        if (!symbol) return

        positionMemoryStorage[symbol] = {
            x: event.currentTarget!.scrollLeft,
            y: event.currentTarget!.scrollTop
        }
    }

    componentDidMount() {
        const symbol = this.props.symbol as any

        if (!symbol) return

        const position = positionMemoryStorage[symbol]

        if (!position) return

        this.elementRef.current!.scrollTo(position.x, position.y)
    }

    render() {
        const {
            symbol,
            elementRef,
            onScrollBottom,
            ...restProps
        } = this.props

        return (
            <div {...restProps}
                ref={this.elementRef}
                onScroll={this.handleScroll.bind(this)}
            >
                {this.props.children}
            </div>
        )
    }
}