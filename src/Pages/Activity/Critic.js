import './Critic.css';

export const Critic = {
    view: function (vnode) {
        return (
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                    <div
                        class="modal-close waves-effect waves-green btn-flat"
                        onclick={() => { vnode.attrs.modalCritic.close() }}
                    >Agree</div>
                </div>
            </div>
        )
    }
}