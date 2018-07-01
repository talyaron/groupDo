import './Footer.css';

export const Footer = {
    view: function (vnode) {
        return (
            <div class='footers'>
                <table>
                    <tr>
                        <td
                            class='footerButtons'
                            onclick={() => { m.route.set('/starts') }}
                        >
                            <i class="material-icons small buttons">arrow_forward</i>
                        </td>
                        <td class='footerButtons'
                            onclick={() => { m.route.set('/chat/' + vnode.attrs.acitivitId + '__general') }}
                        >
                            <i class="material-icons small">chat</i>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}