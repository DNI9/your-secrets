const CopyToClipboard = newClip => {
  navigator.permissions.query({name: 'clipboard-write'}).then(result => {
    if (result.state === 'granted' || result.state === 'prompt') {
      navigator.clipboard
        .writeText(`${window.location.origin}/${newClip}`)
        .then(
          function () {
            console.log('COPIED TO CLIPBOARD');
          },
          function () {
            console.error('COPY FAILED');
          }
        );
    }
  });
};

export default CopyToClipboard;
