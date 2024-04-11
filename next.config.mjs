/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, "bcrypt"]
  //   return config
  // },
}

export default nextConfig
