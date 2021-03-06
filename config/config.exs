# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

config :hedwig, :clients, [
	%{
		jid: "test@iot.net",
		password: "test",
		nickname: "heatmap",
		rooms: [
			"test@iot.net"
		],
		config: %{
			require_tls?: false,
			use_compression?: false,
			use_stream_management?: true,
			transport: :tcp
		},
		handlers: [{Heatmap.DataHandler, %{}}]
}]
# Configures the endpoint
config :heatmap, Heatmap.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "wIDo33SYqpKz3ONcsc93o6bOfFca2tniuStfn3J9Dsv3MHYuQONhLTLzXjhsKJNl",
  render_errors: [default_format: "html"],
  pubsub: [name: Heatmap.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]
#	level: :error

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
