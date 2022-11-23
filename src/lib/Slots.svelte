<div style="width: 100%">
  <hr/>
  <slot name="header">
    <h1>No header</h1>
  </slot>
  <hr/>
  {#if $$slots.body}
    <h4>Body has content</h4>
  {/if}
  <slot name="body">
    <p>No body</p>
  </slot>
  <hr/>
  <slot name="footer">
    <h3>No footer</h3>
  </slot>
  <hr/>
</div>