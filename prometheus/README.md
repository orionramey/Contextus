# 📊 Prometheus Configuration

> "In God we trust. All others must bring data." - W. Edwards Deming

Welcome to the nerve center of your monitoring stack. Prometheus is your all-seeing eye, collecting metrics that tell the story of your systems.

## 🎯 What is Prometheus?

Prometheus is a time-series database designed for monitoring. Think of it as:
- **A historian** - Recording what happened and when
- **A detective** - Finding patterns in the noise  
- **An alarm system** - Alerting when things go wrong
- **A fortune teller** - Predicting issues before they occur

## 📁 Directory Structure

```
prometheus/
├── prometheus.yml       # Main configuration file
├── alerts/             # Alert rule definitions
│   └── basic_alerts.yml # Starter alerts for common issues
└── README.md           # You are here
```

## ⚙️ Configuration Breakdown

### prometheus.yml

This is the heart of Prometheus. Let's understand each section:

#### Global Settings
```yaml
global:
  scrape_interval: 15s      # How often to collect metrics
  evaluation_interval: 15s   # How often to evaluate alert rules
```

**Learning moment**: Why 15 seconds? It's a balance between data freshness and resource usage. Too frequent = overhead. Too slow = missed events.

#### Scrape Configurations
```yaml
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

Each job represents a group of similar targets:
- **prometheus** - Self-monitoring (very meta!)
- **node-exporter** - System metrics (CPU, memory, disk)
- **postgres** - Database health
- **cadvisor** - Container metrics
- **grafana** - Dashboard performance

### Understanding Targets

A target is an endpoint that exposes metrics. Format: `host:port`

**Container networking magic**: Notice we use service names (like `node-exporter:9100`) instead of IPs. Docker's internal DNS resolves these automatically!

## 🚨 Alert Rules

### alerts/basic_alerts.yml

Alerts watch for conditions that need human attention:

#### Alert Anatomy
```yaml
- alert: HighCPUUsage
  expr: 100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High CPU usage detected"
    description: "CPU usage is above 80% (current value: {{ $value }}%)"
```

**Breaking it down:**
- `alert`: The alert name (keep it clear!)
- `expr`: PromQL query that returns true/false
- `for`: How long the condition must be true before firing
- `labels`: Metadata for routing/grouping
- `annotations`: Human-readable descriptions

### Current Alerts

1. **System Alerts**
   - `HighCPUUsage` - CPU > 80% for 5 minutes
   - `HighMemoryUsage` - Memory > 85% for 5 minutes
   - `DiskSpaceLow` - Disk < 20% free space

2. **Service Alerts**
   - `ServiceDown` - Any monitored service stops responding
   - `PostgreSQLDown` - Database connection lost
   - `ContainerRestartingTooOften` - Container crash loops

## 🔍 PromQL Basics

PromQL is Prometheus Query Language. Think SQL for metrics.

### Essential Queries

**Current CPU usage:**
```promql
100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

**Memory usage percentage:**
```promql
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100
```

**Container restart count:**
```promql
rate(container_last_seen{name!=""}[15m])
```

### Query Patterns

1. **Rates** - Use `rate()` for counters
   ```promql
   rate(http_requests_total[5m])
   ```

2. **Averages** - Use `avg()` for aggregation
   ```promql
   avg(node_load1) by (instance)
   ```

3. **Percentages** - Calculate with math
   ```promql
   (metric_used / metric_total) * 100
   ```

## 🎓 Learning Exercises

### Exercise 1: Create Your First Alert
Add to `alerts/basic_alerts.yml`:
```yaml
- alert: LearningInProgress
  expr: up{job="prometheus"} == 1
  for: 1m
  annotations:
    summary: "Prometheus is teaching you!"
    description: "This alert fires when Prometheus is running"
```

### Exercise 2: Explore Metrics
1. Visit http://localhost:9090
2. Click "Graph"
3. Try these queries:
   - `up` - Which services are running?
   - `node_load1` - System load average
   - `container_memory_usage_bytes` - Container memory

### Exercise 3: Create a Recording Rule
Recording rules pre-calculate expensive queries:
```yaml
groups:
  - name: recordings
    rules:
      - record: instance:node_cpu:rate5m
        expr: 100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

## 🛠️ Customization Guide

### Adding New Targets

1. **External Service**
   ```yaml
   - job_name: 'my-app'
     static_configs:
       - targets: ['my-app:8080']
   ```

2. **Multiple Instances**
   ```yaml
   - job_name: 'web-servers'
     static_configs:
       - targets: 
         - 'web1:9100'
         - 'web2:9100'
         - 'web3:9100'
   ```

3. **Service Discovery** (Advanced)
   ```yaml
   - job_name: 'kubernetes-pods'
     kubernetes_sd_configs:
       - role: pod
   ```

### Creating Meaningful Alerts

**Good Alert Checklist:**
- ✅ Actionable - Can someone do something about it?
- ✅ Urgent - Does it need immediate attention?
- ✅ Clear - Is the problem obvious?
- ✅ Unique - Are we avoiding alert fatigue?

**Bad Alert Example:**
```yaml
# Too sensitive, will fire constantly
- alert: CPUNotZero
  expr: node_cpu_usage > 0
```

**Good Alert Example:**
```yaml
# Actionable and meaningful threshold
- alert: DatabaseConnectionPoolExhausted
  expr: pg_stat_database_numbackends / pg_settings_max_connections > 0.9
  for: 5m
```

## 📈 Monitoring Philosophy

### The Four Golden Signals
1. **Latency** - How long things take
2. **Traffic** - How much demand exists
3. **Errors** - What's failing
4. **Saturation** - How full the system is

### USE Method
For every resource, monitor:
- **Utilization** - How busy is it?
- **Saturation** - How much work is queued?
- **Errors** - What's failing?

### RED Method
For every service, monitor:
- **Rate** - Requests per second
- **Errors** - Failed requests
- **Duration** - Time to respond

## 🔧 Troubleshooting

### Prometheus Won't Start
```bash
# Check the configuration
docker-compose exec prometheus promtool check config /etc/prometheus/prometheus.yml

# View logs
docker-compose logs prometheus
```

### Targets Show as "Down"
1. Check network connectivity
2. Verify the exporter is running
3. Check firewall rules
4. Validate the port number

### Queries Return No Data
- Is the metric name correct?
- Is the time range appropriate?
- Are there any samples? Check: `up{job="target-name"}`

## 📚 Advanced Topics

### Federation
Share metrics between Prometheus servers:
```yaml
- job_name: 'federate'
  honor_labels: true
  metrics_path: '/federate'
  params:
    'match[]':
      - '{job="prometheus"}'
```

### Remote Storage
Send metrics to long-term storage:
```yaml
remote_write:
  - url: "http://influxdb:8086/api/v1/prom/write"
```

### High Availability
Run multiple Prometheus instances:
- Use external storage
- Configure identical scrape configs
- Load balance queries

## 🎯 Next Steps

1. **Master PromQL**
   - [PromQL Documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/)
   - Practice with real data
   - Build complex queries

2. **Create Custom Dashboards**
   - Export metrics from Prometheus
   - Visualize in Grafana
   - Share with team

3. **Build Your Own Exporter**
   - Choose a language (Go, Python)
   - Expose custom metrics
   - Add to Prometheus config

## 💡 Pro Tips

1. **Label Carefully** - Labels create new time series
2. **Use Recording Rules** - For expensive queries
3. **Set Reasonable Intervals** - Balance freshness vs load
4. **Monitor the Monitor** - Always self-monitor Prometheus
5. **Document Your Alerts** - Future you will thank you

---

> "Without data, you're just another person with an opinion."

Remember: Prometheus gives you the data. What you do with it determines whether you're reactive or proactive. Choose wisely.