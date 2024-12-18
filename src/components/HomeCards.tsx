export default function HomeCards() {
  return (
    <div id="block-container" className="flex flex-wrap content-center justify-center">
      <div className="inline-block p-6 border border-gray-300 m-5 max-w-2/5 min-w-1/3 rounded-lg transition-transform transform hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-md hover:shadow-gray-500">
        <a href="/build/gateways">
          <img
            className="w-3/4 h-auto"
            src="https://arweave.net/7QeMMRmjItuOHFBkbtJkBj43iJLcaG657K0SR8VS6jM"
          ></img>
          <h3 className="text-gray-800">AR.IO Gateways</h3>
          <p className="text-gray-800">
            AR.IO's modular gateways are built for the Arweave permanent data
            storage network and optimized for data retrieval, caching, serving
            and indexing transactions.
          </p>
        </a>
      </div>

      <div className="inline-block p-6 border border-gray-300 m-5 max-w-2/5 min-w-1/3 rounded-lg transition-transform transform hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-md hover:shadow-gray-500">
        <a href="/learn/arns">
          <img
            className="w-3/4 h-auto"
            src="https://arweave.net/FR2qSulzK089wjDXhjqKoJ2A58Ojt9VR0TyPrwFUzEo"
          ></img>
          <h3 className="text-gray-800">ArNS Names</h3>
          <p className="text-gray-800">
            ArNS is a censorship-resistant naming system stored on Arweave,
            enabling user-friendly domain names that link to permaweb dApps, web
            pages, data, and identities.
          </p>
        </a>
      </div>

      <div className="inline-block p-6 border border-gray-300 m-5 max-w-2/5 min-w-1/3 rounded-lg transition-transform transform hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-md hover:shadow-gray-500">
        <a href="/learn/token">
          <img
            className="w-3/4 h-auto"
            src="https://arweave.net/BU8LC66WTUNhok2V4ZjIMS_0JzMNJTgx2XOrra-pL8E"
          ></img>
          <h3 className="text-gray-800">ARIO Token</h3>
          <p className="text-gray-800">
            ARIO powers the AR.IO Network and its suite of permaweb applications
            as a permissionless and censorship resistant medium of common value
            for the network.
          </p>
        </a>
      </div>

      <div className="inline-block p-6 border border-gray-300 m-5 max-w-2/5 min-w-1/3 rounded-lg transition-transform transform hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-md hover:shadow-gray-500">
        <a
          href="https://whitepaper_ar-io.arweave.net"
          target="_blank"
        >
          <img
            className="w-3/4 h-auto"
            src="https://arweave.net/1YldHoAgp0wW59quuo39twWWIWFXwnD_M-p0SHkGBJM"
          ></img>
          <h3 className="text-gray-800">White Paper</h3>
          <p className="text-gray-800">
            A comprehensive document that details a decentralized and
            incentivized gateway network aimed at making the permaweb more
            accessible to all.
          </p>
        </a>
      </div>

      <div className="inline-block p-6 border border-gray-300 m-5 max-w-2/5 min-w-1/3 rounded-lg transition-transform transform hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-md hover:shadow-gray-500">
        <a href="/learn/network-composition">
          <img
            className="w-3/4 h-auto"
            src="https://arweave.net/wa5xjPQcR0cCrhPkB9OSKD6H5t2lfI4JnezjEEksNcc"
          ></img>
          <h3 className="text-gray-800">The Permaweb</h3>
          <p className="text-gray-800">
            Learn more about the Arweave network, the permaweb and the reason
            the AR.IO gateway network was built.
          </p>
        </a>
      </div>

      <div className="inline-block p-6 border border-gray-300 m-5 max-w-2/5 min-w-1/3 rounded-lg transition-transform transform hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-md hover:shadow-gray-500">
        <a href="/learn/concepts/wayfinder">
          <img
            className="w-3/4 h-auto"
            src="https://arweave.net/qQwoUS6gTQ_9JQa6z1XoTkFGAIKG_4qhF6RuQFVQogE"
          ></img>
          <h3 className="text-gray-800">ar://</h3>
          <p className="text-gray-800">
            The Wayfinder protocol transforms traditional Arweave URLs into more
            concise and user-friendly forms.
          </p>
        </a>
      </div>
    </div>
  )
}
