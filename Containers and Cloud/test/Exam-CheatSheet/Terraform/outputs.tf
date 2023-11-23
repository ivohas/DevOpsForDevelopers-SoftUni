output "webapp_url" {
  value = azurerm_linux_web_app.appservice.default_hostname
}

output "webapp_ips" {
  value = azurerm_linux_web_app.appservice.outbound_ip_addresses
}
